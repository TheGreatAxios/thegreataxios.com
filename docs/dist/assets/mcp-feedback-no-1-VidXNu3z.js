import{u as o,j as e}from"./index-Wzuqctek.js";import{M as r}from"./_footer-BweqUT64.js";import"./github-D7PUkPhI.js";const c={layout:"minimal",authors:["thegreataxios"],date:"2025-10-21",title:"MCP Feedback No. 1"};function i(n){const s={a:"a",code:"code",div:"div",h2:"h2",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...o(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsxs(s.h2,{id:"mcp-feedback-no-1",children:["MCP Feedback No. 1",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#mcp-feedback-no-1",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"The following are personal opinions and perspectives on the Model Context Protocol (MCP) and how teams building developer tooling—both for pure AI and agentic commerce (i.e. x402)—should be thinking about them. If you have any feedback or feel I missed something, please let me know."}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["I think the ",e.jsx(s.a,{href:"https://vercel.com/docs/mcp/deploy-mcp-servers-to-vercel",children:"Vercel"})," and ",e.jsx(s.a,{href:"https://xmcp.dev",children:"xmcp"})," docs are overall really good for those trying to build an MCP server."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["The base of MCP is technically very simple, but when you start to build, there are actually a number of pieces that need to be learned and considered. I think good documentation and examples are critical to the success of having developers build on top of your libraries. Specifically, where possible, you should provide examples ",e.jsx(s.strong,{children:"with and without"})," different pieces of functionality. The most clear-cut one for me is transports: ",e.jsx(s.code,{children:"stdio"})," and ",e.jsx(s.code,{children:"Streamable HTTP"}),". Go ask the average dev what SSE stands for and you'll understand why this is relevant."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"More broadly on documentation and examples: for those looking to extend MCP into something explicit (i.e. x402-enabled MCPs), it's important to provide as many clean and simple examples as possible (e.g. Express, Hono, Next.js, etc.), instead of just one. I also think showing an E2E example (even if separately in a blog) is really helpful. Everyone pushing for MCP adoption—static or agentic—should have at least one E2E example: start, add tool, test, deploy to XYZ provider."}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"Props to the larger enterprises—they tend to be really good at having their documentation match their examples in GitHub. I think this is key to having developers build on top of more complex integrations. If you are building examples in docs, match them with examples in GitHub."}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["I think this is currently stemming from ",e.jsx(s.code,{children:"@modelcontextprotocol/sdk"}),", but the use of Zod v3 everywhere is a bit annoying when all the docs just say ",e.jsx(s.code,{children:"npm add zod"}),". This directly causes friction and either errors during usage or causes the LSP to go haywire. The recommendation is to specify ",e.jsx(s.code,{children:"npm add zod@3"})," in your documentation/tutorials. See ",e.jsx(s.a,{href:"https://xmcp.dev/docs/getting-started/installation#manual-installation",children:"xmcp"}),", which calls this out properly, as well as ",e.jsx(s.a,{href:"https://docs.mcpay.tech/quickstart/sdk",children:"MCPay"}),"."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["The core design of an MCP should be vendor-agnostic. I think Cloudflare currently breaks this with their ",e.jsx(s.a,{href:"https://developers.cloudflare.com/agents/model-context-protocol/mcp-agent-api/",children:"MCP implementation"}),", which has an entirely different design than everyone else. While not bad, it does make it more difficult for me, as I’m uncertain how portable their design is. I also find their “AgentMCP” verbiage a bit confusing, as not all MCPs are designed to be agents."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"Authorization and access controls are mentioned (although a bit buried) in the official MCP documentation. More docs and examples on securing MCPs are needed for as many different authentication schemes as possible—including new and open protocols. How does this play in with trustless agents?"}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"Maybe an unfair statement since many MCP servers have been created, but I find that the vast majority of MCPs exist to either wrap APIs or inference endpoints. Personally, I just want to see more static content and deterministic functionality. I have minimal proof points, and most stem from my own experiences training small language models, but it seems like there’s an opportunity for static MCPs to enhance SLMs trained on specific use cases."}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"The ability to call tools consistently is something that I think is overlooked. When using top language models, it tends not to be as prominent, but there is value in having more consistent tool calling for people building agents using specialized models."}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"On the previous point—could this be easily solved through training a LoRA adapter or similar? I.e. should there be adapters focused on tool calling to enhance existing or older models that are cheaper or better at something specific? (I know, crazy to call an old model better.)"}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"Input and output schemas seem to be semi-standardized. It would be nice to see that become more consistent across MCPs. I think this also helps models become more consistent at calling tools."}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"More clarity (maybe through exploration) on using fewer tools. MCP servers with a lot of tools consume a lot of context. Claude Skills has proven to be a strong alternative and is highly praised for removing this."}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"More guidance for new developers on where and when MCP is actually useful or needed. MCP has been touted as a “one-size-fits-all” solution for developers coming into agentic systems. We need a better way to communicate what pieces should be used where in these growing systems."}),`
`]}),`
`]}),`
`,e.jsxs(s.h2,{id:"the-ideal-experience-from-an-mcp-framework",children:["The Ideal Experience from an MCP Framework",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#the-ideal-experience-from-an-mcp-framework",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"The following are primarily for those implementing MCP frameworks, which are certainly more of a “buy-in” from the developer. Similar to the decision between Next.js, Tanstack, Remix, or Vite, the decision to adopt an MCP framework isn’t something you just throw away and switch. You choose to use the framework because it’s a good fit for your project, team, and needs."}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["Provide an init tool to help avoid versioning differences (see ",e.jsx(s.a,{href:"https://xmcp.dev/docs/getting-started/installation#automatic-installation",children:"xmcp"}),")."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"Utilize a configuration file for the validation of features (yes, another one)."}),`
`]}),`
`]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"interface"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" MCPConfig"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" {"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    location"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:' "local"'}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" |"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:' "remote"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    cors"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" {"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"        origin"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" string"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    };"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    type"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:' "api"'}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" |"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:' "agent"'}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" |"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:' "both"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    toolLayout"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:' "per-tool"'}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" |"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:' "aggregated"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"; "}),e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:'// per-tool = 1 tool per action; aggregated uses "select_tool" and "execute_tool" to reduce context consumption'})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    version"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" string"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"; "}),e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:"// version of the MCP server"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"}"})}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" config"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" MCPConfig"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" ="}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" {"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    location: "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"remote"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    authentication: "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"required"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    cors: {"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"        origin: "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"*"'})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    },"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    type: "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"api"'})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"};"})})]})})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Can the use of the above config enable a form of static analysis that can run during build or setup to check and flag whether things are set up properly?"}),`
`]}),`
`,e.jsxs(s.h2,{id:"my-personal-requests",children:["My Personal Requests",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#my-personal-requests",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:`More clarity on how to use MCPs from anyone touting MCP libraries.
If you are offering MCPs, make it easy for me to pay you to host them for me.
If providing agentic coding tools, provide examples of how to consume the MCP in all popular tools (not just Cursor).
More information (or point me in the right direction) for better authentication schemes, guidance, and security-related resources for MCPs.
One or two more frameworks to push and compete with xmcp and Vercel. More competition drives innovation.
A cloud platform built for hosting MCPs—handling sandbox execution, AI Gateway, authentication (without OAuth, please), x402 integration, etc. I’m a big believer in a SaaS model for MCPs. It’s unrealistic to expect most developers to run their own servers. Also a great opportunity to enable fractional resourcing that hot-swaps scoped API keys for different customers. (High risk, high reward?)
Payment management and tracking software for MCPs. I think there’s a really interesting opportunity with x402 for someone to build middleware that handles tracking, spending, and analytics for the callers (could be cloud or local). For example: my agent calls an MCP server N times per day and spends X via Y.`}),`
`,e.jsxs(s.h2,{id:"conclusion",children:["Conclusion",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#conclusion",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"This is very much my first ramble on something I’m still learning about myself. I don’t think anyone is doing anything wrong—these are all just my opinions and perspectives. If you agree or disagree, feel free to reach out to collaborate or discuss!"}),`
`,`
`,e.jsx(r,{})]})}function d(n={}){const{wrapper:s}={...o(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(i,{...n})}):i(n)}export{d as default,c as frontmatter};
