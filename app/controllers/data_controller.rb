class DataController < ApplicationController
  def index
    api = MissionHub::API.new
    api.auth
    person = MissionHub::Person.new
    begin
      person.first_name = params[:fname]
      person.last_name = params[:lname]
      person.email_address = params[:email]
      person.gender = params[:gender]
      person.set_answer(4956, params[:place])
      person.set_answer(4957, params[:magazine]) unless params[:magazine].blank?
      person.set_answer(4958, params[:journey]) unless params[:journey].blank?
      person.set_answer(4959, params[:interest])
      person.set_answer(4960, params[:kennedy]) unless params[:kennedy].blank?
      person.set_answer(4961, params[:university])
      person.set_answer(4962, params[:faculty])
      person.set_answer(4963, params[:year])
      person.phone = params[:mobile]
      response = api.create_person(person)
      respond_to do |format|
        format.json{
          render :json => 'success'
        }
      end
    rescue => ex
      respond_to do |format|
        format.json{
          render :json => {'error' => ex.message}, :status => :internal_server_error
        }
      end
    end
  end
end
