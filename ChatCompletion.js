// 来自 https://learn.microsoft.com/zh-CN/azure/ai-services/openai/chatgpt-quickstart?tabs=command-line&pivots=programming-language-javascript

import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
// 使用   setx AZURE_OPENAI_KEY "REPLACE_WITH_YOUR_KEY_VALUE_HERE"
// setx AZURE_OPENAI_ENDPOINT "REPLACE_WITH_YOUR_ENDPOINT_HERE" 设置环境变量
const endpoint = process.env["AZURE_OPENAI_ENDPOINT"] ;
const azureApiKey = process.env["AZURE_OPENAI_KEY"] ;
// Change your deployment ID here
const deploymentId = 'gpt35';
const messages = [
  { role: "system", content: "You are a helpful assistant." },
  { role: "user", content: "Does Azure OpenAI support customer managed keys?" },
  { role: "assistant", content: "Yes, customer managed keys are supported by Azure OpenAI" },
  { role: "user", content: "Do other Azure AI services support this too" },
];

async function main() {
  console.log("== Chat Completions Sample ==");
  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const result = await client.getChatCompletions(deploymentId, messages);

  for (const choice of result.choices) {
    console.log(choice.message);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});