## Instructions: Replace FIRSTKEYWORD with your keyword (example: I), SECONDKEYWORD with another keyword (example: travel), THIRDKEYWORD with another keyword (example: dubai).
##you can also remove SECONDKEYWORD and THIRDKEYWORD if needed. Make sure you delete "%20" too as this is the code for space.

weets = Json.Document(Web.Contents(
"https://api.twitter.com/2/
tweets/search/recent?query=FIRSTKEYWORD%20SECONDKEYWORD%20THIRDKEYWORD&max_results=100&tweet.fields=public_metrics,
conversation_id,created_at,entities,geo,context_annotations&user.fields=profile_image_url,username,
created_at,description,entities,id,location,name&expansions=author_id,attachments.media_keys,referenced_tweets.id",
 [Headers=[Authorization="Bearer AAAAAAAAAAAAAAAAAAAAAKplJgEAAAAANqcl00ioEcoVESaf4BtOrls59ZI%3DQIhYULPE4hqvWeCUfyKocWe8dYgSQNANgBvzWDdfxCmQDcvEjQ"]]))



# replace api key with your API key
keyphrases = (text) => let
    apikey      = "APIKEY",
    endpoint    = "https://sentimentanalysis-experiencelab.cognitiveservices.azure.com/text/analytics" & "/v3.0/keyPhrases",
    jsontext    = Text.FromBinary(Json.FromValue(Text.Start(Text.Trim(text), 5000))),
    jsonbody    = "{ documents: [ { language: ""en"", id: ""0"", text: " & jsontext & " } ] }",
    bytesbody   = Text.ToBinary(jsonbody),
    headers     = [#"Ocp-Apim-Subscription-Key" = apikey],
    bytesresp   = Web.Contents(endpoint, [Headers=headers, Content=bytesbody]),
    jsonresp    = Json.Document(bytesresp),
    keyphrases  = Text.Lower(Text.Combine(jsonresp[documents]{0}[keyPhrases], ", "))
in  keyphrases


sentiment = (text) => let
    apikey      = "APIKEY",
    endpoint    = "https://sentimentanalysis-experiencelab.cognitiveservices.azure.com/text/analytics" & "/v3.0/sentiment",
    jsontext    = Text.FromBinary(Json.FromValue(Text.Start(Text.Trim(text), 5000))),
    jsonbody    = "{ documents: [ { language: ""en"", id: ""0"", text: " & jsontext & " } ] }",
    bytesbody   = Text.ToBinary(jsonbody),
    headers     = [#"Ocp-Apim-Subscription-Key" = apikey],
    bytesresp   = Web.Contents(endpoint, [Headers=headers, Content=bytesbody]),
    jsonresp    = Json.Document(bytesresp)//,
   // sentiment   = jsonresp[documents]{0}[confidenceScores]
in  jsonresp

