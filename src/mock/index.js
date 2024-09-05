// 引入mockjs
import Mock from "mockjs";
const { mock } = Mock; // Mock函数
console.log("mock 加载");
// 使用拦截规则拦截命中的请求
// mock( url, post/get, 返回的数据/函数（有return值）);
const data = {
  versionPlatform: "unknown",
  editorParameters: {},
  imageFormat: "svg",
  CASEnabled: false,
  customHeaders: "",
  parseModes: ["latex", "xml"],
  editorToolbar: "",
  editorAttributes: "width=570, height=450, scroll=no, resizable=yes",
  base64savemode: "default",
  modalWindow: true,
  version: "8.8.3.1483",
  enableAccessibility: true,
  saveMode: "xml",
  saveHandTraces: true,
  editorUrl: "http://www.wiris.net/demo/editor/editor",
  editorEnabled: true,
  chemEnabled: true,
  CASMathmlAttribute: "alt",
  CASAttributes: "width=640, height=480, scroll=no, resizable=yes",
  modalWindowFullScreen: false,
  imageMathmlAttribute: "data-mathml",
  hostPlatform: "unknown",
  wirisPluginPerformance: true,
};
function getconfig(req) {
  console.log("请求入参", req);
  return data;
}
mock(/\/config/, "post", getconfig);
