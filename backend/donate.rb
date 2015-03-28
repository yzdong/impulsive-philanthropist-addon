require 'sinatra'
require 'braintree'
require 'net/http'
require 'uri'
require 'pry'
load 'just_giving.rb'

Braintree::Configuration.environment = :sandbox
Braintree::Configuration.merchant_id = "thp37yf88fy592rp"
Braintree::Configuration.public_key = "s9748gsdp7hr24nh"
Braintree::Configuration.private_key = "c93830fab264bbd03285dee81a9e23e6"

post "/payment" do
  result = Braintree::Transaction.sale(
    :amount => "10.00",
    :credit_card => {
      :number => "4111111111111111",
      :expiration_date => "05/2020",
      :cardholder_name => "Tan Kah Kee",
      :cvv => "231"
    }, 
    :options => {
      :submit_for_settlement => true
    }
  )
  message = 'Transaction failed, try again'
  if result.success? 
    message = 'Thank you for your donation!'
  end
  content_type :json
  {message: message}.to_json
end

get '/charity/all/' do
  JustGiving.new.get_all_charity_ids.join(',')
end

get '/charity/test/' do
  JustGiving.new.get_all_charities
end

get '/charity/:id/' do
  JustGiving.new.get_charity_by_id(params[:id])
end
