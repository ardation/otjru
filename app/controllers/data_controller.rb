class DataController < ApplicationController

  def index
    unless Person.exists?(mobile: self.mobile(params[:person][:mobile]), outreach: request.host)
      params[:person][:answers_attributes]["8"] = {content_id: 9, data:request.host}
      @person = Person.create! params[:person]
      @person.outreach = request.host
      @person.save
      @person.delay.sync
      @client = Twilio::REST::Client.new ENV["twilio_id"], ENV["twilio_auth"]
      outreach = Outreach.find_by_url(request.host)
      begin
        message = @client.account.sms.messages.create(:body => outreach.sms,
          :to => "#{outreach.dial_code}#{@person.mobile}",
          :from => "+17784021163")
      rescue
        #pipe twilio errors into the ground
      end
      render json: {validate: true}.to_json
    else
      render json: {validate: false}.to_json
    end
  end

  def mobile(number)
    unless number.blank? or number.length < 3
      number = number.gsub(/[^0-9]/i, '')
      number = number[1..-1] if number[0] == "0"
      return number
    end
  end
end
