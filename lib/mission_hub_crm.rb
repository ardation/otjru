class MissionHubCrm
  def self.sync(person)
    MissionHub.client_secret = '8ead921fdcaeffd129ddea35025db5bc02f07164e07a2535d344822518b4b2c0'
    MissionHub.organization_id = 7935
    mhub_person = MissionHub::Person.create({first_name: person.first_name, last_name: person.last_name, gender: person.gender.try(:capitalize), phone_number: person.mobile, email: person.email })
    person.foreign_id = mhub_person.id
    person.save!

    answers = {}
    person.answers.each do |answer|
      case answer.content.content_type
      when Content::NON_SYNCABLE
        #do nothing
      when Content::FACEBOOK_AUTH
        #do nothing
      when Content::SHORT_ANSWER
        answers[answer.content.foreign_id] = answer.data
      when Content::CHECK_BOX
        unless answer.data.blank?
         answers[answer.content.foreign_id] = JSON.parse(answer.data).reject!(&:empty?).join("\r\n")
        end
      when Content::DROPDOWN
        answers[answer.content.foreign_id] = answer.data
      when Content::RADIO_BUTTON
          answers[answer.content.foreign_id] = answer.data
      when Content::CONTACT
        data = JSON.parse(answer.data)
        data.each do |key, value|
          case key
          when "year"
            answers[JSON.parse(answer.content.foreign_hash)["Year"]] = value
          when "degree"
            answers[JSON.parse(answer.content.foreign_hash)["Degree"]] = value
          when "hall"
            answers[JSON.parse(answer.content.foreign_hash)["Halls"]] = value
          end
        end
      end
    end

    #PUT THIS INTO GEM
    output = {organization_id: MissionHub.organization_id, survey_id: 2113, person_id: person.foreign_id, answers: answers, secret: MissionHub.client_secret}
    RestClient.post("https://www.missionhub.com/apis/v3/answers", output)
  end
end
