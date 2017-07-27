import api_root from './config.js'
var apiZhihu = {
    startimage: '/4/start-image/1080*1776',
    news: '/4/news/latest',
    newsbyid: '/4/news/',
    newsbydate: '/4/news/before/',
    newsinfo: '/4/story-extra',
    topics: '/4/themes',
    topicbyid: '/4/theme/',
    sections: '/3/sections',
    sectionbyid: '/3/section'
}
export const NewsResource = api_root.concat(apiZhihu.news)
export const NewsIdResource = api_root.concat(apiZhihu.newsbyid)
export const NewsDateResource = api_root.concat(apiZhihu.newsbydate)
export const NewsInfoResource = api_root.concat(apiZhihu.newsinfo)
export const TopicsResource = api_root.concat(apiZhihu.topics)
export const TopicsIdResource = api_root.concat(apiZhihu.topicbyid)
export const SectionsResource = api_root.concat(apiZhihu.sections)
export const SectionIdResource = api_root.concat(apiZhihu.sectionbyid)