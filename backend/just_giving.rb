class JustGiving
  @@app_id = '5d7d8bae'
  @@version = 'v1'

  def get_charity_categories
    get_http_req_as_json sprintf('https://api.justgiving.com/%s/%s/charity/categories', @@app_id, @@version)
  end

  def get_all_charity_ids
    charities_json = JSON.parse(get_all_charities)
    ids = []
    charities_json['charitySearchResults'].each { |c| ids << c['charityId'] }

    ids
  end

  def get_all_charities
    hard_limit = 0

    categories_json = JSON.parse(get_charity_categories)
    categories = ''
    categories_json.each {
      |c|
      unless categories.empty?
        categories << '&'
      end
      categories << 'categoryId=' + c['id'].to_s

      break if hard_limit == 0
      hard_limit -= 1
    }

    get_http_req_as_json sprintf('https://api.justgiving.com/%s/%s/charity/search?%s',
                                 @@app_id, @@version, categories)
  end

  def get_charity_by_id(id)
    get_http_req_as_json sprintf('https://api.justgiving.com/%s/%s/charity/%s', @@app_id, @@version, id)
  end

  def get_http_req_as_json(url)
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    req = Net::HTTP::Get.new(uri.request_uri)
    req['Content-Type'] = 'application/json'

    resp = http.request(req)
    resp.body
  end
end