require 'resolv'

module Missionhub
  class Person
    attr_accessor :current_address_attributes, :phone_number, :email_address, :gender, :firstName, :lastName, :answers, :phone_number

    #align variable naming with MissionHub API
    alias :first_name= :firstName=
    alias :first_name :firstName

    alias :last_name= :lastName=
    alias :last_name :lastName

    alias :phone= :phone_number=
    alias :phone :phone_number

    alias :address :current_address_attributes

    def phone=(phone)
      raise "Phone must be a Missionhub::Person::Phone" unless phone.kind_of? Missionhub::Person::Phone
      @phone_number = phone
    end

    def address=(address)
      raise "Address must be a Missionhub::Person::Address" unless address.kind_of? Missionhub::Person::Address
      @current_address_attributes = address
    end

    def set_answer(id, message)
      if @answers.nil?
        @answers = Hash.new
      end

      if message.is_a?(String) or message.is_a?(Hash) or message.is_a?(Array)
        if id.is_a?(Integer)
          if message.is_a?(Array)
            h = {}
            count = 0
            message.each do |v|
              h[count] = v
              count += 1
            end
            message = h
          end
          @answers[id] = message
        else
          raise "Invalid type for id"
        end
      else
        raise "Invalid type for message"
      end
    end

    def get_answer(id)
      @answers[id]
    end

    def current_address_attributes=(address)
      raise "Address must be a Missionhub::Person::Address" unless address.kind_of? Missionhub::Person::Address
      @current_address_attributes = address
    end

    def phone
      @phone_number[:number]
    end

    def phone=(phone)
      unless phone.empty?
        @phone_number = {:number => phone.gsub(/[^0-9]/, ""), :primary => 0, :location => "mobile"}
      else
        raise "Phone appears to be empty"
      end
    end

    def email_address
      @email_address[:email]
    end

    def email_address=(email)
      unless email.empty?
        unless email =~ /^[a-zA-Z][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/
            raise "Email does not appear to be valid format"
        else
            raise "Email domain name appears to be incorrect" unless validate_email_domain(email)
            @email_address = {:email => email, :primary => 0}
        end
      else
        raise "Email appears to be empty"
      end
    end

    def gender=(gender)
      if gender == "male" or gender == "female"
        @gender = gender
      else
        raise "Gender must be either male or female"
      end
    end

    def validate_email_domain(email)
      domain = email.match(/\@(.+)/)[1]
      Resolv::DNS.open do |dns|
        @mx = dns.getresources(domain, Resolv::DNS::Resource::IN::MX)
      end
      @mx.size > 0 ? true : false
    end

    def full_name
      @firstName + " " + @lastName
    end

    def hash
      hash_to_return = {}
      self.instance_variables.each do |var|
        temp = self.instance_variable_get(var)
        if not temp.nil? and var.to_s != "@mx"
          if temp.kind_of? Missionhub::Person::Address
            hash_to_return[var.to_s.gsub("@","")] = temp.hash
          else
            hash_to_return[var.to_s.gsub("@","")] = temp
          end
        end
      end
      return hash_to_return
    end
  end
end
