class DataController < ApplicationController

  def index
    unless Person.exists?(mobile: params[:person][:mobile], outreach: request.host)
      params[:person][:answers_attributes]["8"] = {content_id: 9, data:request.host}
      @person = Person.create! params[:person]
      @client = Twilio::REST::Client.new ENV["twilio_id"], ENV["twilio_auth"]
      outreach = Outreach.find_by_url(request.host)
      message = @client.account.sms.messages.create(:body => outreach.sms,
          :to => "#{outreach.dial_code}#{@person.mobile}",
          :from => "+17784021163")
      render json: {validate: true}.to_json
    else
      render json: {validate: false}.to_json
    end
  end
end
