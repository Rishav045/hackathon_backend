const {Configuration,OpenAIApi} = require("openai")

const config= new Configuration({
    apiKey:process.env.OPENAI_API_KEY
})

const openai= new OpenAIApi(config)


const runPrompt1 =async(req,res)=>{
    const Text = req.body.text
    console.log(Text);
    const response = await openai.createChatCompletion({
        model:"gpt-3.5-turbo",
        max_tokens:2048,
        messages:[
            {
              "role": "user",
              "content": Text
            }
          ]
        
    });
    // console.log(response.data.choices[0].message.content);
    res.send ({"data":response.data.choices[0].message.content});
}

module.exports={runPrompt1}