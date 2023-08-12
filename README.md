# 使用 Azure OpenAI 实现 GraphQL Schema 的自动问答

用于演示通过Azure OpenAI使用自然语言转化成 GraphQL 再调用公共的接口。为演示方便，当前仅支持无验证的公开接口。运行此程序，需要先设置2个环境变量：

```bash
setx AZURE_OPENAI_KEY "REPLACE_WITH_YOUR_KEY_VALUE_HERE"
setx AZURE_OPENAI_ENDPOINT "REPLACE_WITH_YOUR_ENDPOINT_HERE"
```
再到 index.js 中修改 deploymentId 的值，改为你在 Azure OpenAI 中创建的 deployment ID

```bash
// Change your deployment ID here
const deploymentId = 'gpt35';
```
交互语言默认使用中文，也可改成其它语言。修改 index.js 中的 userLanguage 的值即可。
```bash
// Change your language here:
const userLanguage = 'Chinese';
```

然后运行 `npm start -- https://countries.trevorblades.com/` 即可。

## 目前可用的一些公开接口
* `https://countries.trevorblades.com/` - 基本的国家数据
* `https://space-courses-api.herokuapp.com/` - 虚构的太空课程
* `https://rickandmortyapi.com/graphql` - 瑞克和莫蒂
* `https://comet-cruises-api.herokuapp.com/` - 微型示例位置服务
* `https://comet-cruises-activities.herokuapp.com/` - 微型示例活动服务
* `https://api.react-finland.fi/graphql/` - 关于芬兰 React 大会的数据
* `https://barcelona-urban-mobility-graphql-api.netlify.app/graphql/` - 关于巴塞罗那自行车/地铁/公交车站的数据

## 演示示例

### 使用 https://countries.trevorblades.com/ 进行地理问答。

````
npm start -- https://countries.trevorblades.com/

> chatgpt-graphql-schema@1.0.0 start
> node index.js https://countries.trevorblades.com/

379 tokens in schema, each question will cost about 0.15 cents

User input:
> 基里巴斯的ID是什么？

GraphQL query from ChatGPT:
```
{
  country(code: "KI") {
    code
  }
}
```

Response from GraphQL endpoint:
{"data":{"country":{"code":"KI"}}}
Asking ChatGPT to interpret the results: I sent that query and got this response: `{"data":{"country":{"code":"KI"}}}`. Translate that response to `Chinese`.

ChatGPT's interpretation of response:
基里巴斯的ID是 "KI"。

User input:
> 请告诉我关于基里巴斯的所有信息。

GraphQL query from ChatGPT:
```
{
  country(code: "KI") {
    name
    capital
    code
    currencies
    currency
    states {
      name
    }
    languages {
      name
      native
    }
    continent {
      name
      countries {
        name
      }
    }
  }
}
```

ChatGPT's interpretation of response:
关于基里巴斯的详细信息如下：
- 名称为 "Kiribati"。
- 首都为 "South Tarawa"。
- ID 为 "KI"。
- 使用的货币为澳大利亚元 (AUD)，货币代码为 "AUD"。
- 没有行政区划。
- 官方语言为英语，原生语言名称为 "English"
- 所在洲为大洋洲，包含多个国家，其中包括 American Samoa, Australia, Cook Islands, Fiji, Micronesia, Guam, Kiribati, Marshall Islands, Northern Mariana Islands, New Caledonia, Norfolk Island, Nauru, Niue, New Zealand, French Polynesia, Papua New Guinea, Pitcairn Islands, Palau, Solomon Islands, Tokelau, East Timor, Tonga, Tuvalu, U.S. Minor Outlying Islands, Vanuatu, Wallis and Futuna, 和 Samoa。