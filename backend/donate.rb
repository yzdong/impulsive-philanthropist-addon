require 'sinatra'
require 'braintree'
require 'net/http'
require 'uri'
load 'just_giving.rb'

Braintree::Configuration.environment = :sandbox
Braintree::Configuration.merchant_id = "thp37yf88fy592rp"
Braintree::Configuration.public_key = "s9748gsdp7hr24nh"
Braintree::Configuration.private_key = "c93830fab264bbd03285dee81a9e23e6"

# get "/test" do
#   File.read('client_test.html')
# end

# get "/account" do
#   @client_token = Braintree::ClientToken.generate
#   content_type :json
#   {:client_token => @client_token, :client_name => 'Tan Kah Kee' }.to_json
# end 


# post "/donations" do
#   nonce = params[:payment_method_nonce]
#   result = Braintree::Transaction.sale(
#     :amount => "10.00",
#     :payment_method_nonce => nonce, 
#     :options => {
#       :submit_for_settlement => true
#     }
#   )
#   puts 'Received payment: ' + nonce
# end

post "/payment" do
  result = Braintree::Transaction.sale(
    :amount => "10.00",
    :credit_card => {
      :number => "4111111111111111",
      :expiration_date => "05/2020",
      :cardholder_name => "Tan Kah Kee",
      :cvv => "cvv"
    }, 
    :options => {
      :submit_for_settlement => true
    }
  )
  puts result
end

get '/charity/all/' do
  JustGiving.new.get_all_charities
end

get '/charity/:id/' do
  JustGiving.new.get_charity_by_id(params[:id])
end
