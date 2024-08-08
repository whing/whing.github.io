!function(e) {
    var n = !1;
    if ("function" == typeof define && define.amd && (define(e), n = !0), "object" == typeof exports && (module.exports = e(), n = !0), !n) {
        var o = window.Cookies,
        t = window.Cookies = e();
        t.noConflict = function() {
            return window.Cookies = o,
            t
        }
    }
} (function() {
    function e() {
        for (var e = 0,
        n = {}; e < arguments.length; e++) {
            var o = arguments[e];
            for (var t in o) n[t] = o[t]
        }
        return n
    }
    function n(o) {
        function t(n, r, i) {
            var c;
            if ("undefined" != typeof document) {
                if (arguments.length > 1) {
                    if ("number" == typeof(i = e({
                        path: "/"
                    },
                    t.defaults, i)).expires) {
                        var a = new Date;
                        a.setMilliseconds(a.getMilliseconds() + 864e5 * i.expires),
                        i.expires = a
                    }
                    i.expires = i.expires ? i.expires.toUTCString() : "";
                    try {
                        c = JSON.stringify(r),
                        /^[\{\[]/.test(c) && (r = c)
                    } catch(e) {}
                    r = o.write ? o.write(r, n) : encodeURIComponent(r + "").replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                    n = (n = (n = encodeURIComponent(n + "")).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape);
                    var s = "";
                    for (var f in i) i[f] && (s += "; " + f, !0 !== i[f] && (s += "=" + i[f]));
                    return document.cookie = n + "=" + r + s
                }
                n || (c = {});
                for (var p = document.cookie ? document.cookie.split("; ") : [], d = /(%[0-9A-Z]{2})+/g, u = 0; u < p.length; u++) {
                    var l = p[u].split("="),
                    C = l.slice(1).join("=");
                    this.json || '"' !== C.charAt(0) || (C = C.slice(1, -1));
                    try {
                        var m = l[0].replace(d, decodeURIComponent);
                        if (C = o.read ? o.read(C, m) : o(C, m) || C.replace(d, decodeURIComponent), this.json) try {
                            C = JSON.parse(C)
                        } catch(e) {}
                        if (n === m) {
                            c = C;
                            break
                        }
                        n || (c[m] = C)
                    } catch(e) {}
                }
                return c
            }
        }
        return t.set = t,
        t.get = function(e) {
            return t.call(t, e)
        },
        t.getJSON = function() {
            return t.apply({
                json: !0
            },
            [].slice.call(arguments))
        },
        t.defaults = {},
        t.remove = function(n, o) {
            t(n, "", e(o, {
                expires: -1
            }))
        },
        t.withConverter = n,
        t
    }
    return n(function() {})
});

// ----------
/*
document.addEventListener('DOMContentLoaded', function() {
    fetch('https://raw.githubusercontent.com/whing/whing.github.io/master/README.md')
    .then(response => response.text())
    .then(text => {
        // const contentDiv = document.getElementById('readme-content');
        // contentDiv.innerHTML = marked(text);
		// console.log(text);
		const commList = parseMarkdownToCommList(text);
		// console.log(commList);
    })
    .catch(error => console.error('Error fetching README:', error));
});
*/
function fetchReadmeContent() {
    return fetch('https://raw.githubusercontent.com/whing/whing.github.io/master/README.md')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.text();
    })
    .then(text => {
        // return marked(text); // 将Markdown转换为HTML，并返回这个HTML字符串
	return parseMarkdownToCommList(text);
    });
}

function parseMarkdownToCommList(markdownContent) {
    // 这是一个非常简化的解析器，它假设Markdown文件的格式非常具体
    // 根据你的Markdown结构，你可能需要调整这个函数
    const sections = markdownContent.split('## ').slice(1); // 分割章节
	// console.log(sections);
    const commList = [];

    sections.forEach(section => {
        // 获取标题作为slug
		var slug = "";
        const match = section.substring(0, section.indexOf('\n')).toLowerCase().match(/（(.+?)）/);
		if (match) {
			slug = match[1];
			// console.log(slug); // 输出: "common"
		} else {
			console.log("没有匹配到圆括号内的内容");
		}
		// console.log(section);
		const list = parseMarkdownTable(section)
		// console.log(list);

        commList.push({ slug, list });
    });
	
    return commList;
}

function parseMarkdownTable(markdown) {
  // 用于匹配Markdown链接的正则表达式
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  
  // 分割Markdown文本到每一行
  const lines = markdown.split('\n').filter(line => line.trim() !== '');

  // 提取表格标题
  const headers = lines[1].split('|').map(header =>
    header.trim()
  ).filter(header => header !== '');

  // 初始化结果对象数组
  const list = headers.map(header => ({ tag: header, link: [] }));

  // 解析表格行
  for (let i = 3; i < lines.length; i++) { // 跳过前三行（标题和分隔符）
    const row = lines[i].split('|').map(cell =>
      cell.trim()
    ).filter(cell => cell !== '');

    row.forEach((cell, index) => {
      let match;
      while ((match = linkRegex.exec(cell)) !== null) {
        const [text, name, url] = match;
        list[index].link.push({ name, url });
      }
    });
  }

  return list;
}

var comm_list112 = fetchReadmeContent()
console.log(comm_list112);

	
// 2024/8/8
var comm_list = [
	{
	    slug: "common",
	    list: [
		    { tag: "在线翻译",
		      link: [
			      { name: "Google翻译", url: "https://translate.google.com/" },
			      { name: "百度翻译", url: "https://fanyi.baidu.com/" },
			      { name: "DeepL翻译", url: "https://www.deepl.com/" },
			      { name: "有道翻译", url: "https://fanyi.youdao.com/" },
			      { name: "搜狗翻译", url: "https://fanyi.sogou.com/" },
			      { name: "腾讯翻译君", url: "https://fanyi.qq.com/" },
		   	      { name: "金山词霸", url: "http://www.iciba.com/" },
			      // { name: "阿里翻译", url: "https://translate.alibaba.com/" },
		    ]},

		    { tag: "在线文档",
		      link: [
			      { name: "Office", url: "https://www.office.com/" },	
			      { name: "腾讯文档", url: "https://docs.qq.com" },
			      { name: "金山文档", url: "https://www.kdocs.cn" },
			      { name: "石墨文档", url: "https://shimo.im" }, 
			      { name: "钉钉文档", url: "https://docs.dingtalk.com/i/desktop" }, 
			      { name: "谷歌文档", url: "https://docs.google.com/" },
			      // { name: "Dropbox Paper", url: "https://www.dropbox.com/zh_CN/lp/create-docs-online" },
			      // { name: "坚果云文档", url: "https://www.jianguoyun.com/static/html/office-landing/" }, 
			      // { name: "百度云文档", url: "https://pan.baidu.com/doc/template?path=%2F" }, 
			      { name: "讯飞文档", url: "https://iflydocs.com/" }, 
			      // { name: "Zoho文档", url: "https://www.zoho.com.cn/workplace/" }, 
			      // { name: "超级文档", url: "https://sdocapp.com/" }, 
			      // { name: "福昕云文档", url: "https://www.foxitcloud.cn/product-Doc/" }, 
		    ]},
		    
		    { tag: "个人笔记",
		      link: [
			      { name: "OneNote", url: "https://www.onenote.com" },
			      { name: "Notion", url: "https://www.notion.so/" },
			      // { name: "Quip", url: "https://quip.com/" },
			      { name: "息流", url: "https://flowus.cn/" },
			      { name: "飞书", url: "https://www.feishu.cn" },
			      // { name: "我来", url: "https://www.wolai.com/" },
			      { name: "语雀", url: "https://www.yuque.com" },  
			      // { name: "iCloud", url: "https://www.icloud.com/" },
			      { name: "锤子便签", url: "https://cloud.smartisan.com/" },
			      // { name: "小米云服务", url: "https://i.mi.com/" },
			      { name: "有道云笔记", url: "https://note.youdao.com/" },
			      // { name: "Evernote", url: "https://www.evernote.com" },
			      // { name: "印象笔记", url: "https://www.yinxiang.com" },
			      // { name: "为知笔记", url: "https://www.wiz.cn/" },      		      
		    ]},
		    
		    { tag: "个人邮箱",
		      link: [
			      { name: "Outlook", url: "https://outlook.live.com/mail/0/inbox" },
			      { name: "Gmail", url: "https://mail.google.com/mail/u/0/#inbox" },
			      { name: "iCloud", url: "https://www.icloud.com" },
			      { name: "网易Vip邮", url: "https://vip.163.com" },
			      { name: "QQ邮箱", url: "https://mail.qq.com" },
			      { name: "88邮箱", url: "https://www.88.com/mail/#/home" }, 
			      // { name: "完美邮箱", url: "https://www.email.cn/" },
			      // { name: "TOM邮箱", url: "https://mail.tom.com/" },	
			      { name: "139邮箱", url: "https://mail.10086.cn/" },
			      // { name: "沃邮箱", url: "https://mail.wo.cn/" },
			      // { name: "189邮箱", url: "https://mail.189.cn/" },			            	      
			      // { name: "Yahoo!", url: "https://mail.yahoo.com" },
			      // { name: "AOL", url: "https://mail.aol.com/" },
			      // { name: "GMX", url: "https://www.gmx.com" },
			      // { name: "Mail", url: "https://www.mail.com" },
			      // { name: "Yandex", url: "https://mail.yandex.com" },      
		    ]},
		    
		    { tag: "个人网盘",
		      link: [
			      { name: "百度云盘", url: "https://pan.baidu.com/" },
			      { name: "阿里云盘", url: "https://www.aliyundrive.com/" },
			      { name: "天翼云盘", url: "https://cloud.189.cn/" },
			      { name: "坚果云盘", url: "https://www.jianguoyun.com/" },
			      { name: "腾讯微云", url: "https://www.weiyun.com/" },
			      { name: "中移云盘", url: "https://yun.139.com/" },
			      { name: "永硕E盘", url: "https://www.laosan007.ys168.com/" },
		    ]},
		    
		    { tag: "云服务器",
		      link: [
			      { name: "阿里云", url: "https://www.aliyun.com/" },
			      { name: "腾讯云", url: "https://cloud.tencent.com/" },
			      { name: "百度智能云", url: "https://cloud.baidu.com/" },
			      { name: "亚马逊云", url: "https://aws.amazon.com/" },
			      { name: "微软云", url: "https://azure.microsoft.com/" },
			      // { name: "谷歌云", url: "https://cloud.google.com/" },
			      { name: "天翼云", url: "https://www.ctyun.cn/" },
			      { name: "华为云", url: "https://www.huaweicloud.com/" },
		    ]},
		    
		    { tag: "开源社区",
		      link: [
			      { name: "GitHub", url: "https://github.com/" },
			      { name: "Trending", url: "https://github.com/trending" },
			      { name: "HugFace", url: "https://huggingface.co/" },
			      { name: "Spaces", url: "https://huggingface.co/spaces" },
			      { name: "PaperCode", url: "https://paperswithcode.com/" },
			      { name: "SotA", url: "https://paperswithcode.com/sota" },
			      { name: "CatalyzeX", url: "https://www.catalyzex.com/" },
			      // { name: "P_Digest", url: "https://www.paperdigest.org/" },
			      // { name: "P-Digest", url: "https://www.paper-digest.com/" },
			      // { name: "GitBook", url: "https://www.gitbook.com" },
			      // { name: "GitLogs", url: "https://www.gitlogs.com/" },
			      // { name: "Awesome ", url: "https://awesomeopensource.com" },
			      // { name: "OSLs", url: "http://opensourcelibs.com/" },
			      // { name: "Gradio", url: "https://gradio.app/" },
			      // { name: "Curated-Gradio", url: "https://gradio.curated.co/" },
			      // { name: "arXiv", url: "https://arxiv.org/" },
			      // { name: "arXivDaily", url: "http://arxivdaily.com/" },
		    ]},
		    
		    { tag: "智能导航",
		      link: [
			      // { name: "OpenAI", url: "https://openai.com/" },
			      { name: "Futurepedia", url: "https://www.futurepedia.io/" },
			      { name: "AllThingsAI", url: "https://allthingsai.com/" },
			      { name: "DoMore", url: "https://domore.ai/" },
			      { name: "GPTLib", url: "https://chatgptdemo.com/" },
			      { name: "SaasAI", url: "https://saasaitools.com/#tools" },
			      { name: "一起用AI", url: "https://17yongai.com/" },
			      { name: "AINavPro", url: "https://www.ainavpro.com/" },
			      { name: "AIGC导航", url: "https://aigc.cn/" },
			      { name: "AINAV", url: "https://www.ainav.cn/" },
			      { name: "AIGC便利店", url: "http://aigclist.com/" },
			      { name: "Igniter", url: "https://www.igniter.ai/trending" },
			      { name: "GongJu", url: "https://www.gongju.one/" },
			      { name: "FlowGPT", url: "https://flowgpt.com/" },
			      { name: "AI导航", url: "https://ai.tboxn.com/" },
			      { name: "AI研究所", url: "http://www.aiyjs.com/" },
			      { name: "OKCN", url: "http://www.okcn.art/" },
			      { name: "AILib", url: "https://www.ai-lib.club/" },
			      { name: "AI工具合集", url: "https://www.aitoolist.cn/" },
			      { name: "AIHub", url: "https://www.aihub.cn/" },
			      { name: "AI图书馆", url: "https://library.phygital.plus/" },
			      { name: "AI百寶箱", url: "https://www.explainthis.io/zh-hant/ai-toolkit" }, 
			      { name: "AI导航", url: "https://ai.nancheng.fun/" }, 
			      { name: "今日AI", url: "https://www.chinaz.com/ai/" }, 
			      
		    ]},
		    
		    { tag: "推荐网站",
		      link: [
			      { name: "逆商评测网", url: "https://aqexam.com/" },
			      { name: "仙职网", url: "https://angeljob.cn/" },
			      { name: "干脆饭", url: "https://haki.fun/" },
			      { name: "逆商评测网", url: "https://aqexam.com/" },
			      { name: "仙职网", url: "https://angeljob.cn/" },
			      { name: "干脆饭", url: "https://haki.fun/" },
			      { name: "逆商评测网", url: "https://aqexam.com/" },
		    ]},
		    
		    { tag: "体验社区",
		      link: [
			      { name: "Replicate", url: "https://replicate.com/" },
			      { name: "ClipDrop", url: "https://clipdrop.co/stable-diffusion-reimagine" },
			      { name: "魔搭社区", url: "https://www.modelscope.cn/home" },
			      { name: "飞桨社区", url: "https://aistudio.baidu.com/aistudio/index" },
			      { name: "ARC-Lab", url: "https://arc.tencent.com/zh/ai-demos/faceRestoration" },
		    ]},
		    
  
		    
	]},
	
	{
	    slug: "study",
	    list:  [
		    { tag: "自学教程",
		      link: [
			      { name: "莫烦", url: "https://mofanpy.com/" },
			      { name: "华校专", url: "https://www.huaxiaozhuan.com/" },
			      { name: "刘永进", url: "https://cg.cs.tsinghua.edu.cn/people/~Yongjin/Yongjin.htm" },
		    ]},
		    
		    { tag: "排版系统",
		      link: [
			      { name: "Latex", url: "https://www.latex-project.org/" },
			      { name: "Typst", url: "https://typst.app/" },
			      { name: "Overleaf", url: "https://www.overleaf.com/" },
			      { name: "Markdown", url: "https://www.markdownguide.org/" },
			      // { name: "Typora", url: "https://typora.io/" },
			      { name: "CTEX", url: "https://ctex.org/" },
			      { name: "CTAN", url: "https://www.ctan.org/" },
			      { name: "TUG", url: "https://tug.org/" },
		    ]},
		    
		    { tag: "研究主页",
		      link: [
			      { name: "CompVis", url: "https://ommer-lab.com/" },
			      { name: "THUNLP", url: "http://nlp.csai.tsinghua.edu.cn/" },
			      { name: "网易伏羲", url: "https://yuding-netease.github.io/" },
			      { name: "OpenFace", url: "https://www.cl.cam.ac.uk/research/rainbow/projects/openface/" },
			      { name: "openface", url: "http://cmusatyalab.github.io/openface/" },
			      { name: "InsightFace", url: "http://insightface.ai/index.html" },
			      { name: "CI2CV", url: "http://face.ci2cv.net/" },
			      { name: "pix2pix", url: "https://affinelayer.com/pixsrv/" },
			      { name: "CI2CV", url: "http://face.ci2cv.net/" },
			      { name: "TensorFire", url: "https://tenso.rs/demos/fast-neural-style/" },
			      { name: "G-Lab", url: "http://www.seeprettyface.com/" },
			      { name: "CV-Studio", url: "https://www.cvpy.net/studio/cv/func/DeepLearning/cartoonize/cartoonize/page/" },
			      { name: "", url: "" },

		    ]},
		    
		    
		    { tag: "论文专利",
		      link: [
			      { name: "GoogleScholar", url: "https://scholar.google.com/" },
			      { name: "百度学术", url: "https://xueshu.baidu.com/" },
			      { name: "广壮图书馆", url: "https://res.gxlib.org.cn/ermsClient/browse.do;CWJSESSIONID=3DAF4E666699C696249FC60056973CF0" },
			      { name: "AMiner", url: "https://www.aminer.cn/" },
			      { name: "Arnetminer", url: "http://www.arnetminer.org/" },
			      { name: "ResearchGate", url: "https://www.researchgate.net/" },
			      { name: "SemanticScholar", url: "https://www.semanticscholar.org/" },
			      { name: "X-MOL", url: "https://www.x-mol.com/" },
			      { name: "Overleaf", url: "https://www.overleaf.com/" },
			      { name: "BioRender", url: "https://www.biorender.com/" },
			      { name: "Sci-Hub", url: "https://sci-hub.shop/" },
			      // { name: "Sci-Hub2", url: "https://sci-hub.se/" },
			      { name: "OALib", url: "https://www.oalib.com/" },
			      { name: "专利顾如", url: "https://www.patentguru.com/cn" },
			      { name: "CCF-Deadlines", url: "https://ccfddl.github.io/" },
		    ]},
		    
		    { tag: "代码周边",
		      link: [
			      { name: "StarRank", url: "https://gitstar-ranking.com/" },
			      { name: "Awesome", url: "https://github.com/sindresorhus/awesome" },
			      { name: "数字绘画", url: "https://github.com/hua1995116/awesome-ai-painting" },
			      { name: "A2Head", url: "https://github.com/KangweiiLiu/Awesome_Audio-driven_Talking-Face-Generation" },
			      { name: "模型转换", url: "https://github.com/PINTO0309/PINTO_model_zoo" },
			      { name: "神力AI", url: "https://manaai.cn/" },
			      { name: "ModelZoo", url: "https://modelzoo.co/" },
			      { name: "JetsonZoo", url: "https://www.elinux.org/Jetson_Zoo" },
			      { name: "pythonlibs", url: "https://www.lfd.uci.edu/~gohlke/pythonlibs/" },

		    ]},

		    
		    
		    { tag: "项目收藏",
		      link: [
			      { name: "RealBasicVSR", url: "https://github.com/ckkelvinchan/RealBasicVSR.git" },
			      { name: "GFPGAN", url: "https://github.com/TencentARC/GFPGAN" },
			      { name: "iPERCore", url: "https://github.com/iPERDance/iPERCore" },
			      { name: "DaGAN", url: "https://github.com/harlanhong/CVPR2022-DaGAN" },
			      { name: "TPSMM", url: "https://github.com/yoyo-nb/Thin-Plate-Spline-Motion-Model" },
			      { name: "Audio2Head", url: "https://github.com/FuxiVirtualHuman/Audio2Head" },
			      { name: "Audio2Face", url: "https://github.com/FACEGOOD/FACEGOOD-Audio2Face" },
			      { name: "StyleTalk", url: "https://github.com/FuxiVirtualHuman/styletalk" },
			      { name: "GeneFace", url: "https://github.com/yerfor/GeneFace/blob/main/README-zh.md" },
			      { name: "OSTeC", url: "https://github.com/barisgecer/OSTeC" },
			      { name: "P2S2P", url: "https://github.com/eladrich/pixel2style2pixel" },
			      // { name: "CFR-GAN", url: "https://github.com/yeongjoonJu/CFR-GAN" },
			      { name: "Kandinsky2", url: "https://github.com/ai-forever/Kandinsky-2" },
			      { name: "SadTalker", url: "https://github.com/Winfredy/SadTalker" },
			      { name: "SD-WebUI", url: "https://github.com/camenduru/stable-diffusion-webui-colab" },
			      { name: "SD-1Click", url: "https://github.com/nolanaatama/sd-1click-colab" },
			      { name: "SDwebui", url: "https://github.com/AUTOMATIC1111/stable-diffusion-webui" },
			      { name: "ControlNet", url: "https://github.com/lllyasviel/ControlNet-v1-1-nightly" },
		    ]},
	]},
	
	{
	    slug: "aigc",
	    list:  [
		    { tag: "文本生成",
		      link: [
			      { name: "ChatGPT", url: "https://chat.openai.com/" },
			      { name: "Poe", url: "https://poe.com/" },
			      { name: "OpenPlayground", url: "https://nat.dev/" },
			      { name: "Humata", url: "https://www.humata.ai/" },	
			      { name: "ChatThing", url: "https://chatthing.ai/" },	
			      { name: "ChatMind", url: "https://www.chatmind.tech/" },
			      { name: "ChatPDF", url: "https://www.chatpdf.com/" },
			      { name: "ChatExcel", url: "https://www.chatexcel.com/" },
			      { name: "ChatDoc", url: "https://chatdoc.com/chatdoc/#/upload" },
			      { name: "CopilotHub", url: "https://app.copilothub.co/home" },
			      { name: "Open-GPT", url: "https://open-gpt.app/" },
			      { name: "chat合集", url: "https://chatgpts.ninvfeng.xyz/" },
			      { name: "佛祖AI", url: "https://hotoke.ai/" },
			      
		    ]},
		    
		    { tag: "图像生成",
		      link: [
			      { name: "DALL·E2", url: "https://openai.com/product/dall-e-2" },
			      { name: "Midjourney", url: "https://www.midjourney.com/" },
			      { name: "Vega", url: "https://rightbrain.art/" },
			      { name: "LensaAI", url: "https://prisma-ai.com/lensa" },
			      { name: "Lexica", url: "https://lexica.art/" },
			      { name: "Plask", url: "https://plask.ai/" },
			      { name: "FusionBrain", url: "https://fusionbrain.ai/diffusion" },
			      { name: "SDOnline", url: "https://stablediffusionweb.com/" },
			      { name: "AI画伯", url: "https://ai-art.tokyo/" },
		    ]},
		    
		    { tag: "语音生成",
		      link: [
			      { name: "Vocalremover", url: "https://vocalremover.org/zh/" },
			      { name: "Elevenlabs", url: "https://beta.elevenlabs.io/" },
			      { name: "TTS-CN", url: "https://www.text-to-speech.cn/" },
			      { name: "TTSmaker", url: "https://ttsmaker.com/zh-cn" },
		    ]},
		    

		    { tag: "视频生成",
		      link: [
			      { name: "D-ID", url: "https://studio.d-id.com/" },
			      { name: "Wonder", url: "https://wonderdynamics.com/" },
			      { name: "Runway", url: "https://runwayml.com/" },
			      { name: "Colossyan", url: "https://www.colossyan.com/" },
			      { name: "Kaiber", url: "https://www.kaiber.ai/" },
		    ]},
		    
		    { tag: "国产平替",
		      link: [
			      { name: "文心一言", url: "https://yiyan.baidu.com/" },
			      { name: "文心一格", url: "https://yige.baidu.com/" },
			      { name: "文心百中", url: "https://wenxin.baidu.com/baizhong/knowledgesearch" },
			      { name: "文心作画", url: "https://wenxin.baidu.com/ernie-vilg" },
			      { name: "通义千问", url: "https://tongyi.aliyun.com/" },   
			      { name: "商汤日日新", url: "https://techday.sensetime.com/list" },
			      { name: "Aski", url: "https://aski.ai/" },
			      { name: "字语智能", url: "https://getgetai.com" },
		    ]},
		    
		    { tag: "Prompt绘图", //
		      link: [
			      { name: "MJPHelper", url: "https://prompt.noonshot.com/" },
			      { name: "SDPHelper", url: "https://promptomania.com/stable-diffusion-prompt-builder/" },
			      { name: "Lexica", url: "https://lexica.art/" },
			      { name: "AIA", url: "https://www.the-ai-art.com/" },
			      { name: "KREA", url: "https://www.krea.ai/" },
			      { name: "画宇宙", url: "https://creator.nolibox.com/gallery" },
			      { name: "画宇宙Help", url: "https://nolibox.feishu.cn/wiki/wikcnMKUh12BCPdvB2ILPyBEgwd?table=tbljP76F2t8UGLHH" },      
		    ]},
		    
		    { tag: "文生图", // eg. AI绘图
		      link: [
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
		    ]},
		    
		    { tag: "文生音", // eg. TTS
		      link: [
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
		    ]},
		    
		    { tag: "图生文", // eg. OCR
		      link: [
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
		    ]},
		    
		    { tag: "图生图", // eg. 图像风格迁移
		      link: [
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
		    ]},
		    
		    { tag: "图生音", // eg. ?
		      link: [
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
		    ]},
		    
		    { tag: "音生文", // eg. ASR
		      link: [
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
		    ]},
		    
		    { tag: "音生图", // eg. Talking-Head
		      link: [
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
		    ]},
		    
		    { tag: "音生音", // eg. 语音风格转换
		      link: [
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      { name: "", url: "" },
		    ]},
	    
	]},
	
	{
	    slug: "metaverse",
	    list:  [
		    { tag: "虚拟数人",
		      link: [
			      { name: "ChatD-ID", url: "https://chat.d-id.com/" },
			      { name: "Motionverse", url: "https://demo.deepscience.cn/chatGPT/#/" },
			      { name: "AnyHuman", url: "http://www.anyhuman.cn/#/" }, 
			      { name: "DUIX", url: "https://www.guiji.ai/#/interaction/" },
			      { name: "相芯科技", url: "https://www.faceunity.com/avatarx.html" },
			      { name: "抖音集团", url: "https://www.volcengine.com/product/avatar" },
			      { name: "科大讯飞", url: "https://www.xfyun.cn/services/VirtualHumans" },
			      { name: "阿里巴巴", url: "https://cn.aliyun.com/product/ai/avatar" },
			      { name: "腾讯", url: "https://cloud.tencent.com/product/ivh" },
			      { name: "科大讯飞", url: "https://zhisheng.xunfei.cn/vlive" },
			      { name: "百度", url: "https://cloud.baidu.com/product/baidudigitalhuman.html" },
			      { name: "科大讯飞", url: "https://www.xfyun.cn/services/VirtualHumans" },
			      { name: "科大讯飞", url: "https://www.xfyun.cn/services/VirtualHumans" },
			      { name: "科大讯飞", url: "https://www.xfyun.cn/services/VirtualHumans" },
			      { name: "科大讯飞", url: "https://www.xfyun.cn/services/VirtualHumans" },
		    ]},
		    
		    { tag: "动捕驱动",
		      link: [
			      { name: "Motionface", url: "https://www.motionface.cn/" },
			      { name: "万兴播爆", url: "https://virbo.wondershare.cn/" },
		    ]},
		    
		    
	]},
	
	{
	    slug: "web3",
	    list:  [
		    { tag: "暂无名称",
		      link: [   
			      { name: "百度", url: "https://baidu.com/" },
		    ]},
		    
	]},
	
	{
	    slug: "blog",
	    list:  [
		    { tag: "前沿资讯",
		      link: [
			      { name: "极市", url: "https://www.cvmart.net/" },
			      { name: "智源", url: "https://hub.baai.ac.cn/" },
			      { name: "FN精选", url: "https://foresightnews.pro" },
			      { name: "合集网", url: "https://233heji.com/" },
		    ]},
		    
		    { tag: "专题资料",
		      link: [
			      { name: "YouPromptMe", url: "http://www.youpromptme.cn" },
		    ]},
		    
		    { tag: "人生感悟",
		      link: [
			      { name: "叶夕青兮", url: "https://erl.im/" },
		    ]},
		    
		    { tag: "文章导航",
		      link: [
			      { name: "小报童导航", url: "https://xiaobot.netlify.app/" }, 
		    ]},
		    
		    { tag: "VideoGene",
		      link: [
			      { name: "Mov2mov", url: "https://github.com/Scholar01/sd-webui-mov2mov" }, 
			      { name: "t2v-imagen", url: "https://github.com/lucidrains/imagen-pytorch#text-to-video" },
			      { name: "Text2Video-Zero", url: "https://github.com/picsart-ai-research/text2video-zero" },
			      { name: "DAMO-VILab", url: "https://huggingface.co/damo-vilab/text-to-video-ms-1.7b-legacy" },
			      { name: "Text2Video", url: "https://github.com/sibozhang/Text2Video" },
			      { name: "SD-Videos", url: "https://github.com/nateraw/stable-diffusion-videos" },
			      { name: "VideoLDM", url: "https://research.nvidia.com/labs/toronto-ai/VideoLDM/" },
		    ]},
		    
	]},
	
	
	
	{
	    slug: "tool",
	    list:  [
		    { tag: "微信生态",
		      link: [
			      { name: "微信网页", url: "https://wx.qq.com/" },
			      { name: "微读网页", url: "https://weread.qq.com/" },
			      { name: "微传网页", url: "https://filehelper.weixin.qq.com/" },
			      { name: "微公平台", url: "https://mp.weixin.qq.com/" },
			      { name: "微开平台", url: "https://open.weixin.qq.com/" },
			      { name: "微广平台", url: "https://ad.weixin.qq.com/" },
			      { name: "企微平台", url: "https://work.weixin.qq.com/" }, 
			      // { name: "微信支付", url: "https://pay.weixin.qq.com/" },
		    ]},
		    
		    { tag: "检索下载",
		      link: [
			      { name: "B站下载", url: "https://xbeibeix.com/api/bilibili/" },
			      { name: "GitHub加速1", url: "https://toolwa.com/github/" },
			      { name: "GitHub加速2", url: "https://github.zhlh6.cn/" },    
			      { name: "APK下载1", url: "https://apkpure.com/cn/" },
			      { name: "APK下载2", url: "http://apkleecher.com/" },
			      { name: "安娜搜书", url: "https://annas-archive.org/" },
			      { name: "易书检索", url: "https://search.yibook.org/" },
		    ]},  
		    
		    { tag: "网站托管",
		      link: [
			      { name: "Vercel", url: "https://vercel.com/" },
			      { name: "LiveKit", url: "https://livekit.io/" },
			      { name: "", url: "" },
			      { name: "", url: "" },
			      
		    ]},
		    
		    { tag: "便捷办公",
		      link: [
			      { name: "Netron在线", url: "https://netron.app/" },
			      { name: "MD在线", url: "https://md.mzr.me/" },
			      { name: "Resume在线", url: "https://www.resumeis.com/" }, 
			      { name: "ProcessOn", url: "https://www.processon.com/" }, 
			      { name: "标小智", url: "https://www.logosc.cn/" }, 
			      
			      
		    ]},
		    
		    { tag: "视频转GIF",
		      link: [
			      { name: "图贴士", url: "https://www.tutieshi.com/video/" }, 
			      { name: "ezgif", url: "https://ezgif.com/video-to-gif" }, 
			      { name: "gif.ski", url: "https://gif.ski/" },
		    ]}, 
		    
		    { tag: "人脸处理",
		      link: [
			      { name: "FaceHub", url: "https://facehub.live/home/free-swap-image/" }, 
			      { name: "FaceSwapper", url: "https://faceswapper.ai/" }, 
			      { name: "Reflect", url: "https://reflect.tech/faceswap/" },
			      { name: "QianHeAI", url: "https://www.qianheai.com/" }, 
			      { name: "PhotoFunia", url: "https://photofunia.com/cn/categories/all_effects/face_swap" }, 
			      { name: "Cutout", url: "https://www.cutout.pro/zh-CN/photo-animer-gif-emoji/upload" }, 
		    ]}, 
		    
		    { tag: "图像视频",
		      link: [
			      { name: "腾讯智影", url: "https://zenvideo.qq.com/home" },
			      { name: "一帧秒创", url: "https://aigc.yizhentv.com/" },
			      { name: "Unscreen", url: "https://www.unscreen.com/" },
			      { name: "remove.bg", url: "https://www.remove.bg/zh" },
			      { name: "magicstudio", url: "https://magicstudio.com/zh/backgrounderaser" },
			      { name: "爱分割", url: "https://www.aisegment.cn/" },
			      { name: "图片超分", url: "https://imgupscaler.com/" },
			      { name: "清图", url: "https://qingtu.cn/" },
			      { name: "佐糖抠图", url: "https://picwish.cn/" },
			      { name: "据意查句", url: "https://wantquotes.net/" },
			      { name: "deepai", url: "https://deepai.org/machine-learning-model/colorizer" },

		    ]},
		    
		    { tag: "上海生活",
		      link: [
			      { name: "上海一网通办", url: "https://zwdt.sh.gov.cn/govPortals/index" },
			      { name: "上海居住证", url: "https://www.962222.net/pages/jzz/jzz.html" },
			      { name: "上海社保", url: "http://www.12333sh.gov.cn/sbsjb/wzb/226.jsp" },
			      { name: "上海公租房", url: "https://zfzl.fgj.sh.gov.cn/gg_house/zl_house.html" },
			      { name: "上海保障房", url: "http://fgj.sh.gov.cn/zfbzgsgg/index.html" },
		    ]},
		    
		    { tag: "K12教育",
		      link: [
			      { name: "简明字帖", url: "https://www.babawar.com/" },
		    ]},
		    
		    
		    { tag: "微企服务",
		      link: [
			      { name: "AQexam", url: "http://mail.aqexam.com" },
			      { name: "Whing", url: "https://exmail.qq.com/login" },
			      { name: "免费企业邮", url: "http://ym.163.com" },
		    ]}, 
		   
		    { tag: "娱乐游戏",
		      link: [
			      { name: "HDmoli", url: "https://www.hdmoli.com/" }, 
			      { name: "多人贪吃蛇", url: "http://slither.io/" }, 
		    ]}, 
		     
		    
		    { tag: "应用商店",
		      link: [
			      { name: "Motionleap", url: "https://play.google.com/store/apps/details?id=com.lightricks.pixaloop&hl=zh&gl=US" }, 


		    ]},  
		    
		    { tag: "其他工具",
		      link: [
			      { name: "Wormhole", url: "https://wormhole.app" },
			      { name: "AirPortal", url: "https://airportal.cn" },
			      { name: "Sendcm", url: "https://send.cm" },
			      { name: "IMEIChecker", url: "https://sickw.com/" },
			      { name: "V2RaySE", url: "https://v2rayse.com/" },
			      { name: "Huemint", url: "https://huemint.com/brand-intersection/" },
			      
		    ]},

	]},
	
]
// 2024/8/8 */
console.log(comm_list);

/*
var comm_list = [{
    slug: "common",
    list: [{
        tag: "热门",
        link: [{
            name: "百度",
            url: "https://baidu.com/"
        },
        {
            name: "谷歌",
            url: "https://www.google.com/"
        },
        {
            name: "必应",
            url: "https://cn.bing.com/"
        },
        {
            name: "搜狗",
            url: "https://www.sogou.com/"
        },
        {
            name: "今日头条",
            url: "https://www.toutiao.com/"
        },
        {
            name: "煎蛋",
            url: "https://jandan.net/"
        },
        {
            name: "数字尾巴",
            url: "http://www.dgtle.com/"
        }]
    },
    {
        tag: "社交",
        link: [{
            name: "微博",
            url: "https://www.weibo.com/"
        },
        {
            name: "贴吧",
            url: "https://tieba.baidu.com/"
        },
        {
            name: "知乎",
            url: "https://www.zhihu.com/"
        },
        {
            name: "豆瓣",
            url: "https://www.douban.com/"
        },
        {
            name: "V2EX",
            url: "https://www.v2ex.com/"
        },
        {
            name: "简书",
            url: "https://www.jianshu.com/"
        },
        {
            name: "Twitter",
            url: "https://twitter.com/"
        }]
    },
    {
        tag: "资讯",
        link: [{
            name: "网易",
            url: "https://www.163.com/"
        },
        {
            name: "腾讯",
            url: "http://www.qq.com/"
        },
        {
            name: "新浪",
            url: "http://www.sina.com.cn/"
        },
        {
            name: "搜狐",
            url: "http://www.sohu.com/"
        },
        {
            name: "凤凰网",
            url: "http://www.ifeng.com/"
        },
        {
            name: "人民网",
            url: "http://www.people.com.cn/"
        },
        {
            name: "新华网",
            url: "http://xinhuanet.com/"
        }]
    },
    {
        tag: "购物",
        link: [{
            name: "淘宝",
            url: "https://www.taobao.com/"
        },
        {
            name: "京东",
            url: "https://www.jd.com/"
        },
        {
            name: "拼多多",
            url: "https://youhui.pinduoduo.com/"
        },
        {
            name: "苏宁易购",
            url: "https://www.suning.com/"
        },
        {
            name: "网易严选",
            url: "https://you.163.com/"
        },
        {
            name: "小米商城",
            url: "https://www.mi.com/"
        },
        {
            name: "什么值得买",
            url: "https://www.smzdm.com/"
        }]
    },
    {
        tag: "视频",
        link: [{
            name: "优酷",
            url: "https://www.youku.com/"
        },
        {
            name: "爱奇艺",
            url: "https://www.iqiyi.com/"
        },
        {
            name: "腾讯视频",
            url: "https://v.qq.com/"
        },
        {
            name: "哔哩哔哩",
            url: "https://www.bilibili.com/"
        },
        {
            name: "YouTube",
            url: "https://www.youtube.com/"
        },
        {
            name: "斗鱼直播",
            url: "https://www.douyu.com/"
        },
        {
            name: "虎牙直播",
            url: "https://www.huya.com/"
        }]
    },
    {
        tag: "工作",
        link: [{
            name: "领英",
            url: "https://cn.linkedin.com/"
        },
        {
            name: "拉勾网",
            url: "https://www.lagou.com/"
        },
        {
            name: "智联招聘",
            url: "https://www.zhaopin.com/"
        },
        {
            name: "前程无忧",
            url: "https://www.51job.com/"
        },
        {
            name: "应届生",
            url: "http://www.yingjiesheng.com/"
        },
        {
            name: "脉脉",
            url: "https://maimai.cn/"
        },
        {
            name: "酷工作",
            url: "https://www.v2ex.com/?tab=jobs"
        }]
    },
    {
        tag: "生活",
        link: [{
            name: "美团",
            url: "https://www.meituan.com/"
        },
        {
            name: "大众点评",
            url: "https://www.dianping.com/"
        },
        {
            name: "携程",
            url: "https://www.ctrip.com/"
        },
        {
            name: "去哪儿",
            url: "https://www.qunar.com/"
        },
        {
            name: "飞猪",
            url: "https://www.alitrip.com/"
        },
        {
            name: "12306",
            url: "https://kyfw.12306.cn/otn/index/init"
        },
        {
            name: "马蜂窝",
            url: "https://www.mafengwo.cn/"
        }]
    },
    {
        tag: "便捷",
        link: [{
            name: "词典翻译",
            url: "https://fanyi.baidu.com/"
        },
        {
            name: "天气预报",
            url: "http://www.weather.com.cn/live/"
        },
        {
            name: "快递查询",
            url: "https://www.kuaidi100.com/"
        },
        {
            name: "在线转换",
            url: "https://cn.office-converter.com/"
        },
        {
            name: "临时网盘",
            url: "https://send.firefox.com/"
        },
        {
            name: "网页微信",
            url: "https://wx.qq.com/"
        },
        {
            name: "QQ邮箱",
            url: "https://mail.qq.com/"
        }]
    }]
},
{
    slug: "amuse",
    list: [{
        tag: "发现",
        link: [{
            name: "煎蛋",
            url: "https://jandan.net/"
        },
        {
            name: "果壳网",
            url: "https://www.guokr.com/"
        },
        {
            name: "黑市",
            url: "https://www.h5ma.com/"
        },
        {
            name: "糗事百科",
            url: "https://www.qiushibaike.com/"
        },
        {
            name: "暴走漫画",
            url: "http://baozou.com/"
        },
        {
            name: "百思不得姐",
            url: "http://www.budejie.com/"
        },
        {
            name: "好奇心日报",
            url: "http://www.qdaily.com/"
        }]
    },
    {
        tag: "影视",
        link: [{
            name: "优酷",
            url: "https://www.youku.com/"
        },
        {
            name: "爱奇艺",
            url: "https://www.iqiyi.com/"
        },
        {
            name: "腾讯视频",
            url: "https://v.qq.com/"
        },
        {
            name: "乐视视频",
            url: "http://www.le.com/"
        },
        {
            name: "芒果TV",
            url: "https://www.mgtv.com/"
        },
        {
            name: "央视网",
            url: "http://tv.cctv.com/"
        },
        {
            name: "YouTube",
            url: "https://www.youtube.com/"
        }]
    },
    {
        tag: "直播",
        link: [{
            name: "斗鱼直播",
            url: "https://www.douyu.com/"
        },
        {
            name: "YY直播",
            url: "https://www.yy.com/"
        },
        {
            name: "虎牙直播",
            url: "https://www.huya.com/"
        },
        {
            name: "花椒直播",
            url: "http://www.huajiao.com/"
        },
        {
            name: "企鹅电竞",
            url: "https://egame.qq.com/"
        },
        {
            name: "一直播",
            url: "https://www.yizhibo.com/"
        },
        {
            name: "Twitch",
            url: "https://www.twitch.tv/"
        }]
    },
    {
        tag: "动漫",
        link: [{
            name: "哔哩哔哩",
            url: "https://www.bilibili.com/"
        },
        {
            name: "AcFun",
            url: "http://www.acfun.cn/"
        },
        {
            name: "嘀哩嘀哩",
            url: "http://www.dilidili.name/"
        },
        {
            name: "半次元",
            url: "https://bcy.net/"
        },
        {
            name: "网易漫画",
            url: "https://manhua.163.com/"
        },
        {
            name: "有妖气",
            url: "http://u17.com/"
        },
        {
            name: "萌娘百科",
            url: "https://zh.moegirl.org/"
        }]
    },
    {
        tag: "游戏",
        link: [{
            name: "Steam",
            url: "https://store.steampowered.com/"
        },
        {
            name: "游民星空",
            url: "http://www.gamersky.com/"
        },
        {
            name: "口袋巴士",
            url: "http://www.tgbus.com/"
        },
        {
            name: "17173",
            url: "https://www.17173.com/"
        },
        {
            name: "多玩游戏",
            url: "http://www.duowan.com/"
        },
        {
            name: "3DMGAME",
            url: "https://www.3dmgame.com/"
        },
        {
            name: "橙光游戏",
            url: "http://www.66rpg.com/"
        }]
    },
    {
        tag: "音乐",
        link: [{
            name: "网易云音乐",
            url: "https://music.163.com/"
        },
        {
            name: "虾米音乐",
            url: "https://www.xiami.com/"
        },
        {
            name: "QQ音乐",
            url: "https://y.qq.com/"
        },
        {
            name: "豆瓣FM",
            url: "https://douban.fm/"
        },
        {
            name: "喜马拉雅FM",
            url: "https://www.ximalaya.com/"
        },
        {
            name: "音悦Tai",
            url: "http://www.yinyuetai.com/"
        },
        {
            name: "5sing原创",
            url: "http://5sing.kugou.com/"
        }]
    },
    {
        tag: "体育",
        link: [{
            name: "腾讯体育",
            url: "http://sports.qq.com/"
        },
        {
            name: "网易体育",
            url: "http://sports.163.com/"
        },
        {
            name: "新浪体育",
            url: "http://sports.sina.com.cn/"
        },
        {
            name: "央视体育",
            url: "http://sports.cctv.com/"
        },
        {
            name: "乐视体育",
            url: "http://www.lesports.com/"
        },
        {
            name: "直播吧",
            url: "https://www.zhibo8.cc/"
        },
        {
            name: "虎扑",
            url: "https://www.hupu.com/"
        }]
    },
    {
        tag: "小说",
        link: [{
            name: "起点中文网",
            url: "https://www.qidian.com/"
        },
        {
            name: "纵横中文网",
            url: "http://www.zongheng.com/"
        },
        {
            name: "红袖添香",
            url: "https://www.hongxiu.com/"
        },
        {
            name: "豆瓣阅读",
            url: "https://read.douban.com/"
        },
        {
            name: "网易云阅读",
            url: "http://yuedu.163.com/"
        },
        {
            name: "鲸鱼阅读",
            url: "http://www.jingyu.com/"
        },
        {
            name: "片刻",
            url: "http://pianke.me/"
        }]
    }]
},
{
    slug: "study",
    list: [{
        tag: "课程",
        link: [{
            name: "网易公开课",
            url: "https://open.163.com/"
        },
        {
            name: "网易云课堂",
            url: "https://study.163.com/"
        },
        {
            name: "腾讯课堂",
            url: "https://ke.qq.com/"
        },
        {
            name: "中国大学MOOC",
            url: "https://www.icourse163.org/"
        },
        {
            name: "慕课网",
            url: "https://www.imooc.com/"
        },
        {
            name: "极客学院",
            url: "http://www.jikexueyuan.com/"
        },
        {
            name: "爱课程",
            url: "http://www.icourses.cn/"
        }]
    },
    {
        tag: "文库",
        link: [{
            name: "百度文库",
            url: "https://wenku.baidu.com/"
        },
        {
            name: "道客巴巴",
            url: "http://www.doc88.com/"
        },
        {
            name: "豆丁网",
            url: "http://www.docin.com/"
        },
        {
            name: "爱问共享资料",
            url: "http://ishare.iask.sina.com.cn/"
        },
        {
            name: "360doc",
            url: "http://www.360doc.com/"
        },
        {
            name: "凌风云文库",
            url: "https://wenku.lingfengyun.com/"
        },
        {
            name: "MBA智库",
            url: "http://www.mbalib.com/"
        }]
    },
    {
        tag: "学术",
        link: [{
            name: "谷歌学术",
            url: "https://scholar.google.com/"
        },
        {
            name: "百度学术",
            url: "http://xueshu.baidu.com/"
        },
        {
            name: "必应学术",
            url: "https://cn.bing.com/academic"
        },
        {
            name: "中国知网",
            url: "http://www.cnki.net/"
        },
        {
            name: "万方数据",
            url: "http://www.wanfangdata.com.cn/"
        },
        {
            name: "维普网",
            url: "http://www.cqvip.com/"
        },
        {
            name: "OALib",
            url: "http://www.oalib.com/"
        }]
    },
    {
        tag: "词典",
        link: [{
            name: "汉语词典",
            url: "http://hd.cnki.net/kxhd"
        },
        {
            name: "剑桥词典",
            url: "https://dictionary.cambridge.org/zhs/"
        },
        {
            name: "柯林斯词典",
            url: "https://www.collinsdictionary.com/zh/"
        },
        {
            name: "有道词典",
            url: "https://www.youdao.com/"
        },
        {
            name: "汉典",
            url: "http://www.zdic.net/"
        },
        {
            name: "日中辞典",
            url: "https://cjjc.weblio.jp/"
        },
        {
            name: "韩中词典",
            url: "https://zh.dict.naver.com/"
        }]
    },
    {
        tag: "资讯",
        link: [{
            name: "腾讯教育",
            url: "http://edu.qq.com/"
        },
        {
            name: "搜狐教育",
            url: "http://learning.sohu.com/"
        },
        {
            name: "新浪教育",
            url: "http://www.163.com/"
        },
        {
            name: "中国教育在线",
            url: "http://www.eol.cn/"
        },
        {
            name: "新东方",
            url: "http://www.xdf.cn/"
        },
        {
            name: "沪江英语",
            url: "http://www.hjenglish.com/"
        },
        {
            name: "无忧考网",
            url: "https://www.51test.net/"
        }]
    },
    {
        tag: "模考",
        link: [{
            name: "我要模考",
            url: "http://www.51mokao.com/"
        },
        {
            name: "考满分留学",
            url: "http://www.kmf.com/"
        },
        {
            name: "LeetCode",
            url: "https://leetcode-cn.com/"
        },
        {
            name: "中华会计网校",
            url: "http://www.chinaacc.com/tiku/"
        },
        {
            name: "打字练习",
            url: "https://www.typing.com/student"
        },
        {
            name: "驾校一点通",
            url: "http://www.jxedt.com/"
        },
        {
            name: "驾考宝典",
            url: "http://www.jiakaobaodian.com/"
        }]
    },
    {
        tag: "便捷",
        link: [{
            name: "多邻国",
            url: "http://www.duolingo.cn/"
        },
        {
            name: "扇贝",
            url: "https://www.shanbay.com/"
        },
        {
            name: "百词斩",
            url: "http://www.baicizhan.com/"
        },
        {
            name: "51VOA",
            url: "http://www.51voa.com/"
        },
        {
            name: "在线PDF",
            url: "https://smallpdf.com/cn"
        },
        {
            name: "公式字符",
            url: "http://webdemo.myscript.com/"
        },
        {
            name: "Wolfram Alpha",
            url: "https://www.wolframalpha.com/"
        }]
    },
    {
        tag: "成绩",
        link: [{
            name: "英语四六级",
            url: "https://www.chsi.com.cn/cet/"
        },
        {
            name: "普通话水平",
            url: "http://hainan.cltt.org/web/login/pscp01001.aspx"
        },
        {
            name: "会计从业资格",
            url: "http://60.208.116.167:81/pas/querycert.jsp"
        },
        {
            name: "教师资格",
            url: "http://ntce.neea.edu.cn/html1/folder/1508/211-1.htm?sid=660"
        },
        {
            name: "计算机等级",
            url: "http://zscx.neea.edu.cn/html1/folder/1508/211-1.htm?sid=300"
        },
        {
            name: "雅思",
            url: "http://ielts.etest.edu.cn/"
        },
        {
            name: "托福",
            url: "https://toefl.neea.cn/"
        }]
    }]
},
{
    slug: "life",
    list: [{
        tag: "出行",
        link: [{
            name: "美团",
            url: "https://www.meituan.com/"
        },
        {
            name: "携程",
            url: "https://www.ctrip.com/"
        },
        {
            name: "去哪儿",
            url: "https://www.qunar.com/"
        },
        {
            name: "飞猪",
            url: "https://www.alitrip.com/"
        },
        {
            name: "途牛",
            url: "http://www.tuniu.com/"
        },
        {
            name: "12306",
            url: "https://kyfw.12306.cn/otn/index/init"
        },
        {
            name: "马蜂窝",
            url: "https://www.mafengwo.cn/"
        }]
    },
    {
        tag: "美食",
        link: [{
            name: "下厨房",
            url: "http://www.xiachufang.com/"
        },
        {
            name: "美食天下",
            url: "https://www.meishichina.com/"
        },
        {
            name: "豆果美食",
            url: "https://www.douguo.com/"
        },
        {
            name: "搜狐美食",
            url: "http://chihe.sohu.com/"
        },
        {
            name: "心食谱",
            url: "https://www.xinshipu.com/"
        },
        {
            name: "中华菜谱网",
            url: "http://www.chinacaipu.com/"
        },
        {
            name: "美食杰",
            url: "http://www.meishij.net/"
        }]
    },
    {
        tag: "房产",
        link: [{
            name: "房天下",
            url: "http://www.fang.com/"
        },
        {
            name: "链家",
            url: "http://www.lianjia.com/"
        },
        {
            name: "房多多",
            url: "http://www.fangdd.com/"
        },
        {
            name: "安居客",
            url: "http://www.anjuke.com/"
        },
        {
            name: "腾讯房产",
            url: "http://house.qq.com/"
        },
        {
            name: "搜狐焦点",
            url: "https://house.focus.cn/"
        },
        {
            name: "乐居",
            url: "http://www.leju.com/"
        }]
    },
    {
        tag: "汽车",
        link: [{
            name: "汽车之家",
            url: "http://www.autohome.com.cn/"
        },
        {
            name: "太平洋汽车",
            url: "http://www.pcauto.com.cn/"
        },
        {
            name: "易车网",
            url: "http://www.bitauto.com/"
        },
        {
            name: "爱卡汽车",
            url: "http://www.xcar.com.cn/"
        },
        {
            name: "网易汽车",
            url: "http://auto.163.com/"
        },
        {
            name: "新浪汽车",
            url: "http://auto.sina.com.cn/"
        },
        {
            name: "搜狐汽车",
            url: "http://auto.sohu.com/"
        }]
    },
    {
        tag: "财经",
        link: [{
            name: "东方财富",
            url: "http://www.eastmoney.com/"
        },
        {
            name: "第一财经",
            url: "http://www.yicai.com/"
        },
        {
            name: "凤凰财经",
            url: "http://finance.ifeng.com/"
        },
        {
            name: "网易财经",
            url: "http://money.163.com/"
        },
        {
            name: "和讯财经",
            url: "http://www.hexun.com/"
        },
        {
            name: "雪球",
            url: "https://xueqiu.com/"
        },
        {
            name: "易码",
            url: "http://www.geeeet.cn/"
        }]
    },
    {
        tag: "时尚",
        link: [{
            name: "太平洋时尚",
            url: "https://www.pclady.com.cn/"
        },
        {
            name: "瑞丽网",
            url: "http://www.rayli.com.cn/"
        },
        {
            name: "美丽说",
            url: "http://www.meilishuo.com/"
        },
        {
            name: "蘑菇街",
            url: "http://www.mogujie.com/"
        },
        {
            name: "YOKA",
            url: "http://www.yoka.com/"
        },
        {
            name: "OnlyLady",
            url: "http://www.onlylady.com/"
        },
        {
            name: "VOGUE",
            url: "http://www.vogue.com.cn/"
        }]
    },
    {
        tag: "健康",
        link: [{
            name: "搜狐健康",
            url: "http://health.sohu.com/"
        },
        {
            name: "新浪健康",
            url: "http://health.sina.com.cn/"
        },
        {
            name: "凤凰健康",
            url: "http://fashion.ifeng.com/health/"
        },
        {
            name: "寻医问药",
            url: "http://www.xywy.com/"
        },
        {
            name: "丁香园",
            url: "http://www.dxy.cn/"
        },
        {
            name: "39健康网",
            url: "http://www.39.net/"
        },
        {
            name: "有问必答",
            url: "http://www.120ask.com/"
        }]
    },
    {
        tag: "查询",
        link: [{
            name: "网速测试",
            url: "http://www.speedtest.net/"
        },
        {
            name: "电话归属地",
            url: "http://www.114best.com/dh/"
        },
        {
            name: "列车时刻",
            url: "http://qq.ip138.com/train/"
        },
        {
            name: "实时航班",
            url: "http://map.variflight.com/"
        },
        {
            name: "台风路径",
            url: "http://typhoon.zjwater.gov.cn/"
        },
        {
            name: "交通违章查询",
            url: "http://www.ip138.com/weizhang.htm"
        },
        {
            name: "比一比价",
            url: "http://www.b1bj.com/"
        }]
    }]
},
{
    slug: "tech",
    list: [{
        tag: "发现",
        link: [{
            name: "V2EX",
            url: "https://www.v2ex.com/"
        },
        {
            name: "掘金",
            url: "https://juejin.im/"
        },
        {
            name: "开源中国",
            url: "https://www.oschina.net/"
        },
        {
            name: "CSDN",
            url: "https://www.csdn.net/"
        },
        {
            name: "InfoQ",
            url: "http://www.infoq.com/cn/"
        },
        {
            name: "H5MA",
            url: "https://www.h5ma.com/"
        },
        {
            name: "HackerNews",
            url: "https://news.ycombinator.com/"
        }]
    },
    {
        tag: "数码",
        link: [{
            name: "数字尾巴",
            url: "http://www.dgtle.com/"
        },
        {
            name: "爱范儿",
            url: "https://www.ifanr.com/"
        },
        {
            name: "雷锋网",
            url: "https://www.leiphone.com/"
        },
        {
            name: "极客公园",
            url: "http://www.geekpark.net/"
        },
        {
            name: "比特网",
            url: "http://www.chinabyte.com/"
        },
        {
            name: "ZEALER",
            url: "http://www.zealer.com/"
        },
        {
            name: "Engadget",
            url: "https://chinese.engadget.com/"
        }]
    },
    {
        tag: "平台",
        link: [{
            name: "GitHub",
            url: "https://github.com/"
        },
        {
            name: "Coding",
            url: "https://coding.net/"
        },
        {
            name: "石墨",
            url: "https://shimo.im/"
        },
        {
            name: "百度脑图",
            url: "http://naotu.baidu.com/"
        },
        {
            name: "CmdMarkdown",
            url: "https://www.zybuluo.com/mdeditor"
        },
        {
            name: "TinyPNG",
            url: "https://tinypng.com/"
        },
        {
            name: "SM.MS 图床",
            url: "https://sm.ms/"
        }]
    },
    {
        tag: "工具",
        link: [{
            name: "IP查询",
            url: "https://www.ipip.net/ip.html"
        },
        {
            name: "Speedtest",
            url: "http://www.speedtest.net/"
        },
        {
            name: "17CE",
            url: "https://www.17ce.com/"
        },
        {
            name: "在线工具",
            url: "https://tool.lu/"
        },
        {
            name: "代码格式化",
            url: "https://www.freeformatter.com/"
        },
        {
            name: "临时邮箱",
            url: "https://www.moakt.com/"
        },
        {
            name: "域名比价",
            url: "https://www.domcomp.com/"
        }]
    },
    {
        tag: "文档",
        link: [{
            name: "Microsoft文档",
            url: "https://docs.microsoft.com/zh-cn/"
        },
        {
            name: "Google开发者",
            url: "https://developers.google.com/china/"
        },
        {
            name: "MDN文档",
            url: "https://developer.mozilla.org/zh-CN/"
        },
        {
            name: "W3school",
            url: "http://www.w3school.com.cn/"
        },
        {
            name: "菜鸟教程",
            url: "http://www.runoob.com/"
        },
        {
            name: "Linux命令",
            url: "http://man.linuxde.net/"
        },
        {
            name: "微信小程序",
            url: "https://mp.weixin.qq.com/debug/wxadoc/dev/index.html"
        }]
    },
    {
        tag: "博客",
        link: [{
            name: "阿里UED",
            url: "http://www.aliued.cn/"
        },
        {
            name: "有赞技术",
            url: "https://tech.youzan.com/"
        },
        {
            name: "京东JDC",
            url: "http://jdc.jd.com/"
        },
        {
            name: "腾讯全端",
            url: "http://www.alloyteam.com/"
        },
        {
            name: "百度UED",
            url: "http://ued.baidu.com/"
        },
        {
            name: "人人网FED",
            url: "https://fed.renren.com/"
        },
        {
            name: "阮一峰博客",
            url: "http://www.ruanyifeng.com/"
        }]
    },
    {
        tag: "资源",
        link: [{
            name: "少数派",
            url: "https://sspai.com/"
        },
        {
            name: "数码荔枝",
            url: "https://www.lizhi.io/"
        },
        {
            name: "异次元",
            url: "https://www.iplaysoft.com/"
        },
        {
            name: "Softonic",
            url: "https://en.softonic.com/"
        },
        {
            name: "MacInformer",
            url: "http://macdownload.informer.com/"
        },
        {
            name: "站长下载",
            url: "http://down.chinaz.com/"
        },
        {
            name: "中科大镜像",
            url: "http://mirrors.ustc.edu.cn/"
        }]
    },
    {
        tag: "云端",
        link: [{
            name: "阿里云",
            url: "https://www.aliyun.com/"
        },
        {
            name: "腾讯云",
            url: "https://cloud.tencent.com/"
        },
        {
            name: "AWS",
            url: "https://aws.amazon.com/cn/"
        },
        {
            name: "GoogleCloud",
            url: "https://cloud.google.com/"
        },
        {
            name: "Linode",
            url: "https://www.linode.com/"
        },
        {
            name: "DigitalOcean",
            url: "https://www.digitalocean.com/"
        },
        {
            name: "Bandwagon",
            url: "https://bandwagonhost.com/"
        }]
    }]
},
{
    slug: "design",
    list: [{
        tag: "灵感",
        link: [{
            name: "Behance",
            url: "https://www.behance.net/"
        },
        {
            name: "Dribbble",
            url: "https://dribbble.com/"
        },
        {
            name: "Muzli",
            url: "https://muz.li/"
        },
        {
            name: "MyDesy",
            url: "https://www.mydesy.com/"
        },
        {
            name: "ZCOOL",
            url: "http://www.zcool.com.cn/"
        },
        {
            name: "FWA",
            url: "https://thefwa.com/"
        },
        {
            name: "LandBook",
            url: "https://land-book.com/"
        }]
    },
    {
        tag: "图库",
        link: [{
            name: "Huaban",
            url: "http://huabanpro.com/"
        },
        {
            name: "Unsplash",
            url: "https://unsplash.com/"
        },
        {
            name: "Pixabay",
            url: "https://pixabay.com/"
        },
        {
            name: "500px",
            url: "https://500px.com/"
        },
        {
            name: "Pinterest",
            url: "https://www.pinterest.com/"
        },
        {
            name: "PEXELS",
            url: "https://www.pexels.com/"
        },
        {
            name: "SplitShire",
            url: "https://www.splitshire.com/"
        }]
    },
    {
        tag: "素材",
        link: [{
            name: "NiPic",
            url: "http://www.nipic.com/"
        },
        {
            name: "58Pic",
            url: "http://www.58pic.com/"
        },
        {
            name: "freepik",
            url: "https://www.freepik.com/"
        },
        {
            name: "UIKit",
            url: "http://www.uikit.me/"
        },
        {
            name: "Pixeden",
            url: "https://www.pixeden.com/"
        },
        {
            name: "Subtlepatterns",
            url: "http://subtlepatterns.com/"
        },
        {
            name: "Fribbble",
            url: "http://www.fribbble.com/"
        }]
    },
    {
        tag: "字体",
        link: [{
            name: "Fontsup",
            url: "https://fontsup.com/"
        },
        {
            name: "dafont",
            url: "https://www.dafont.com/"
        },
        {
            name: "Qiuziti",
            url: "http://www.qiuziti.com/"
        },
        {
            name: "MyFonts",
            url: "https://www.myfonts.com/"
        },
        {
            name: "Fonts2u",
            url: "https://zh.fonts2u.com/"
        },
        {
            name: "Fontfabric",
            url: "http://www.fontfabric.com/"
        },
        {
            name: "UrbanFonts",
            url: "https://www.urbanfonts.com/"
        }]
    },
    {
        tag: "交互",
        link: [{
            name: "UICN",
            url: "http://www.ui.cn/"
        },
        {
            name: "SiteSee",
            url: "https://sitesee.co/"
        },
        {
            name: "UIGarage",
            url: "https://uigarage.net/"
        },
        {
            name: "BestWebsite",
            url: "https://bestwebsite.gallery/"
        },
        {
            name: "CollectUI",
            url: "http://collectui.com/"
        },
        {
            name: "UIMovement",
            url: "https://uimovement.com/"
        },
        {
            name: "Reeoo",
            url: "https://reeoo.com/"
        }]
    },
    {
        tag: "颜色",
        link: [{
            name: "ColorHunt",
            url: "https://colorhunt.co/"
        },
        {
            name: "Coolors",
            url: "https://coolors.co/"
        },
        {
            name: "AdobeColor",
            url: "https://color.adobe.com/zh/"
        },
        {
            name: "WebGradients",
            url: "https://webgradients.com/"
        },
        {
            name: "Trianglify",
            url: "https://trianglify.io/"
        },
        {
            name: "ColorFavs",
            url: "http://www.colorfavs.com/"
        },
        {
            name: "Colllor",
            url: "http://colllor.com/"
        }]
    },
    {
        tag: "工具",
        link: [{
            name: "Fotor",
            url: "https://www.fotor.com.cn/"
        },
        {
            name: "Photopea",
            url: "https://www.photopea.com/"
        },
        {
            name: "AutoDraw",
            url: "https://www.autodraw.com/"
        },
        {
            name: "Figma",
            url: "https://www.figma.com/"
        },
        {
            name: "SVG Draw",
            url: "http://editor.method.ac/"
        },
        {
            name: "CloudConvert",
            url: "https://cloudconvert.com/"
        },
        {
            name: "TinyPNG",
            url: "https://tinypng.com/"
        }]
    },
    {
        tag: "规范",
        link: [{
            name: "Apple",
            url: "https://developer.apple.com/design/"
        },
        {
            name: "Google",
            url: "https://design.google/"
        },
        {
            name: "Microsoft",
            url: "https://www.microsoft.com/design/"
        },
        {
            name: "Material",
            url: "https://material.io/"
        },
        {
            name: "Android",
            url: "https://developer.android.google.cn/design/"
        },
        {
            name: "ScreenSize",
            url: "http://screensiz.es/phone"
        },
        {
            name: "WeUI",
            url: "https://weui.io/"
        }]
    }]
}]
*/
// ----------

var _hmt = _hmt || []; !
function() {
    var e = document.createElement("script");
    e.src = "https://hm.baidu.com/hm.js?84cc8b8c40865142a910d1e921f40539";
    var t = document.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(e, t)
} ()

// -----------------------------------------------------------------------------------------------------------------

!function(o){"use strict"
function t(t){o(".work-link").find(".tab span.active").removeClass("active")
var e,n,a="",l=o(t).attr("class")
// if(o(t).addClass("active"),o.each(comm_list,function(t,i){l==i.slug&&(e=i.list,o.each(e,function(t,i){a+="<ul><li>"+i.tag+"</li>",n=i.link,o.each(n,function(o,t){a+='<li><a href="'+t.url+'" target="_blank">'+t.name+"</a></li>"}),a+="</ul>"}))}),o(".work-link").find(".tab span:first").hasClass("active")&&"1"==i("schl")){var s="assets/data/univ/"+i("univ")+".js"
if(o(t).addClass("active"),o.each(comm_list,function(t,i){l==i.slug&&(e=i.list,o.each(e,function(t,i){a+="<ul><li>"+i.tag+"</li>",n=i.link,o.each(n,function(o,t){a+='<li><a href="'+t.url+'" target="_blank">'+t.name+"</a></li>"}),a+="</ul>"}))}),o(".work-link").find(".tab span:first").hasClass("active")&&"1"==i("schl")){var s="assets/data/univ/"+i("univ")+".js"
o.getScript(s,function(){var t=univ_list.link,i="<ul><li>校园</li>"
o.each(t,function(o,t){i+='<li><a href="'+t.url+'" target="_blank">'+t.name+"</a></li>"}),i+="</ul>",o(".work-link").css("opacity","1").find(".info").hide().html(a).fadeIn(200).find("ul:nth-child(6)").html(i)}).fail(function(){var t="<ul><li>校园</li><li>暂未收录</li></ul>"
o(".work-link").css("opacity","1").find(".info").hide().html(a).fadeIn(200).find("ul:nth-child(6)").html(t)})}else o(".work-link").css("opacity","1").find(".info").hide().html(a).fadeIn(200)}

function i(o){var t={bkgd:"#ededed",srch:"baidu",schl:"0",prov:"1",univ:"1001"}

return Cookies.get(o)||t[o]}

function e(o,t,i){Cookies.set(o,t,{expires:i||3650})}

function n(t){o("body").css("background",t)}

function a(t){if(o(t).addClass("active").siblings(".active").removeClass("active"),o(".search-hidden").remove(),

o(t).hasClass("baidu")) o(".search-form").attr("action", "https://www.baidu.com/s"),
o(".search-keyword").attr({
	name: "word",
	placeholder: "百度一下，你就知道"
})

else if (o(t).hasClass("google")) o(".search-form").attr("action", "https://www.google.com/search"),
o(".search-keyword").attr({
	name: "q",
	placeholder: "Google 搜索"
})

else if (o(t).hasClass("github")) o(".search-form").attr("action", "https://github.com/search"),
o(".search-keyword").attr({
	name: "q",
	placeholder: "GitHub Code Search"
})
	      
else if (o(t).hasClass("bing")) o(".search-form").attr("action", "https://cn.bing.com/search"),
o(".search-keyword").attr({
	name: "q",
	placeholder: "微软 Bing 搜索"
})

else if (o(t).hasClass("sogou")) o(".search-form").attr("action", "https://www.sogou.com/web"),
o(".search-keyword").attr({
	name: "query",
	placeholder: "上网从搜狗开始"
})

else if (o(t).hasClass("so")) o(".search-form").attr("action", "https://www.so.com/s"),
o(".search-keyword").attr({
	name: "q",
	placeholder: "360搜索，SO靠谱"
})
	      
else if (o(t).hasClass("zhihu")) o(".search-form").attr("action", "https://www.zhihu.com/search"),
o(".search-keyword").attr({
	name: "q",
	placeholder: "有问题，问知乎"
})

else if (o(t).hasClass("webcrawler")) o(".search-form").attr("action", "https://www.webcrawler.com/serp"),
o(".search-keyword").attr({
	name: "q",
	placeholder: "WebCrawler Search"
})
	      
else if (o(t).hasClass("mijisou")) o(".search-form").attr("action", "https://mijisou.com/"),
o(".search-keyword").attr({
	name: "q",
	placeholder: "一个不追踪你的搜索引擎"
})

// else if (o(t).hasClass("image")) {
	// o(".search-form").attr("action", "https://cn.bing.com/images/search"),
	// o(".search-keyword").attr({
		// name: "q",
		// placeholder: "海量图片搜索"
	// })	
// var i=new Image
// i.src="https://images.google.com/favicon.ico?"+Date.now(),i.onload=function(){o(".search-form").attr("action","https://www.google.com/search"),o(".search-form").prepend('<input class="search-hidden" type="hidden" name="tbm" value="isch">')}}else if(o(t).hasClass("lookao")){o(".search-form").attr("action","https://youhui.pinduoduo.com/"),o(".search-keyword").attr({name:"keyword",placeholder:"超级搜索"})}else if(o(t).hasClass("torrent"))o(".search-form").attr("action","https://torrentz2.eu/search"),o(".search-keyword").attr({name:"f",placeholder:"磁力链，种子搜索"})

// else if(o(t).hasClass("scholar")){o(".search-form").attr("action","https://xueshu.baidu.com/s"),o(".search-keyword").attr({name:"wd",placeholder:"中英文文献检索"})
// var i=new Image
// i.src = "https://scholar.google.com/favicon.ico?" + Date.now(),
// i.onload = function() {
	// o(".search-form").attr("action", "https://scholar.google.com/scholar"),
	// o(".search-keyword").attr({
		// name: "q"
	// }),
	// o(".search-form").prepend('<input class="search-hidden" type="hidden" name="hl" value="zh-CN">')
// }
// }
o(".search-keyword").focus()
}

o.ajaxSetup({
	cache: !0
}), n(i("bkgd")), t(o(".work-link").find(".tab span:first")), a(o(".search-tab").find("span." + i("srch"))), o(".work-link .tab").on("click", "span", function() {
	t(o(this))
}), o(".search-tab").on("click", "span",function() {
	a(o(this)),
	e("srch", this.className.split(" ")[0])
}), o("#setting-icon").on("click", function() {
	o(".work-link .info").hide().html('<div style="padding: 30px 30px 0;min-height: 400px;"><div class="row"><div id="setting-bkgd"class="column col-4"><label>站点背景</label><select><option value="#ededed">山雾</option><option value="#ffffff">素白</option><option value="#f5d9d9">桃夭</option><option value="#8d6262">荔枝</option><option value="#b9d7ea">天色</option><option value="#aacfd0">青川</option><option value="#283c63">深海</option><option value="#928a97">陆离</option><option value="#444f5a">青纯</option><option value="#373c38">石墨</option><option value="#40514e">月夜</option><option value="#4d4545">消炭</option></select></div><div class="column col-4"></div></div><div class="row"><input id="setting-save"type="button"value="保存"style="padding: 0 40px;"></div></div>').fadeIn(200),
	o("#setting-bkgd select").val(i("bkgd")),
	o("#setting-schl select").val(i("schl")),
	o("#setting-prov select").val(i("prov")),
	o("#setting-bkgd select").change(function() {
		n(o(this).val())
	}),
	o.getScript("assets/data/univ.li.js",
	function() {
		function t(t, i) {
			var e, n			
o.each(univ_list,function(a,l){t==l.id&&(e=l.univs,n="",o.each(e,function(o,t){n+="<option value="+t.id+">"+t.name+"</option>"}),o("#setting-univ select").html(n),i&&o("#setting-univ select").val(i))})}t(o("#setting-prov select").val(),i("univ")),o("#setting-prov select").change(function(){t(o("#setting-prov select").val())})}),o("#setting-save").off("click").on("click",function(){e("bkgd",o("#setting-bkgd select").val()),e("schl",o("#setting-schl select").val()),o("#setting-univ select").val()&&(e("prov",o("#setting-prov select").val()),e("univ",o("#setting-univ select").val())),t(o(".work-link").find(".tab span:first"))})})}
(jQuery)
