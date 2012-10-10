module Missionhub
  class Person
    class Address
      attr_accessor :address1, :address2, :city, :country, :state, :zip

      def hash
        hash_to_return = {}
        self.instance_variables.each do |var|
          hash_to_return[var.to_s.gsub("@","")] = self.instance_variable_get(var)
        end
        hash_to_return
      end
    end
  end
end
