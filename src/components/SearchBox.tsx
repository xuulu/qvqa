"use client"
import React, {useEffect, useState} from "react";
import {AutoComplete, Input, Select, Space} from "antd";
import useDeviceDetection from "@/hooks/useDeviceDetection";

// 解构出 Option 组件
const {Option} = Select;
const {Search} = Input;

// 定义搜索引擎配置对象类型
type SearchEngine = {
    name: string;              // 搜索引擎名称
    placeholder?: string;      // 输入框占位符文本
    searchUrl: string;         // 搜索基础 URL
    suggestApi?: (query: string) => Promise<string[]>; // 联想词 API 函数（可选）
};

const search_engine = `https://api.qvqa.cn/api/search_engine?q=你好`;

// 预定义搜索引擎列表，支持扩展
const SEARCH_ENGINES: SearchEngine[] = [
    {
        name: "Bing",
        placeholder: "搜索必应...",
        searchUrl: "https://www.bing.com/search?q=",
        // Bing 的联想词 API 实现
        suggestApi: async (query) => {
            const res = await fetch(`${search_engine}${query}&baidu=true`);
            const data = await res.json();
            return data.data.list || []; // 返回联想词数组
        },
    },

    {
        name: "Baidu",
        placeholder: "搜索百度...",
        searchUrl: "https://www.baidu.com/s?wd=",
        // 百度不支持跨域请求，返回空数组
        suggestApi: async (query) => {
            const res = await fetch(`${search_engine}${query}&baidu=true`);
            const data = await res.json();
            return data.data.list || []; // 返回联想词数组
        },
    },
    {
        name: "360",
        placeholder: "搜索360...",
        searchUrl: "https://www.so.com/s?q=",
        // 360 联想词
        suggestApi: async (query) => {
            const res = await fetch(`${search_engine}${query}&to360=true`);
            const data = await res.json();
            return data.data.list || []; // 返回联想词数组
        },
    },
    {
        name: "Sogou",
        placeholder: "搜索搜狗...",
        searchUrl: "https://www.sogou.com/web?query=",
        // 搜狗联想词功能未实现
        suggestApi: async () => [],
    },

    {
        name: "Google",
        placeholder: "搜索谷歌...",
        searchUrl: "https://www.google.com/search?q=",
        // Google 的联想词 API 实现
        suggestApi: async (query) => {
            const res = await fetch(`https://suggestqueries.google.com/complete/search?client=firefox&q=${query}`);
            const data = await res.json();
            return data[1] || []; // 返回联想词数组
        },
    },
];

// 主组件定义
const SearchBox: React.FC = () => {
    // 从本地存储获取上次选择的搜索引擎，服务端渲染时设为 null
    const storedEngine = typeof window !== "undefined" ? localStorage.getItem("selectedEngine") : null;

    // 设置默认搜索引擎：优先使用存储的引擎，否则使用第一个
    const defaultEngine = SEARCH_ENGINES.find((e) => e.name === storedEngine) || SEARCH_ENGINES[0];

    // 状态管理：当前搜索引擎、查询关键词、联想词列表
    const [engine, setEngine] = useState<SearchEngine>(defaultEngine);
    const [query, setQuery] = useState("");
    const [suggests, setSuggests] = useState<string[]>([]);

    // 获取设备信息
    const {isMobile} = useDeviceDetection();

    // 副作用钩子：处理联想词获取逻辑
    useEffect(() => {
        // 如果没有设置联想 API 或查询为空，则清空联想词
        if (!engine.suggestApi || !query) {
            setSuggests([]);
            return;
        }

        // 设置防抖定时器，避免频繁请求
        const timer = setTimeout(async () => {
            try {
                // 再次检查条件防止竞态
                if (!engine.suggestApi || !query) {
                    setSuggests([]);
                    return;
                }
                // 调用对应搜索引擎的联想词 API
                const results = await engine.suggestApi(query);
                console.log("联想成功", results);
                setSuggests(results || []); // 更新联想词状态
            } catch (err) {
                console.error("联想失败", err); // 错误处理
                setSuggests([]); // 失败时清空联想词
            }
        }, 100); // 300ms 防抖延迟

        // 清理函数：清除定时器避免内存泄漏
        return () => clearTimeout(timer);
    }, [query, engine]); // 依赖项：query 和 engine 变化时重新执行

    // 执行搜索操作
    const handleSearch = (value?: string) => {
        const searchQuery = value || query;
        if (!searchQuery) return; // 联想词为空时不执行搜索

        // 在新窗口打开搜索结果页面
        // window.open(url);

        // 当前窗口打开
        window.location.href = `${engine.searchUrl}${encodeURIComponent(searchQuery)}`;

    };

    // 切换搜索引擎
    const handleEngineChange = (value: string) => {
        // 查找选中的搜索引擎配置
        const selected = SEARCH_ENGINES.find((e) => e.name === value);
        if (selected) {
            setEngine(selected); // 更新当前搜索引擎

            // 将选择保存到本地存储
            localStorage.setItem("selectedEngine", selected.name);

            setQuery(""); // 清空搜索框内容
        }
    };

    // 渲染 UI 组件
    return (
        <Space align="center">
            {/* 搜索引擎选择下拉框 */}
            <Select
                value={engine.name}
                onChange={handleEngineChange}
                style={{
                    width: isMobile ? "87px" : "100px",
                    transform: 'translateY(1px)'
            }}
            >
                {/* 动态渲染所有可用搜索引擎选项 */}
                {SEARCH_ENGINES.map((e) => (
                    <Option key={e.name} value={e.name}>
                        {e.name}
                    </Option>
                ))}
            </Select>

            {/* 自动完成输入框，带联想词提示 */}
            <AutoComplete
                options={suggests.map((s) => ({value: s}))} // 转换联想词为选项格式
                value={query}
                onChange={setQuery}
                placeholder={engine.placeholder || "搜索..."} // 显示对应搜索引擎的占位符
                filterOption={false} // 关闭内置过滤，完全由后端控制
                onSelect={handleSearch} // 选择联想词时触发搜索
            >
                {/* 搜索输入框及按钮 */}
                <Search
                    style={{
                        width: isMobile ? "250px" : "500px",
                    }}
                    // enterButton="搜索"
                    // enterButton
                    showCount
                    onSearch={handleSearch} // 回车或点击搜索按钮触发
                />
            </AutoComplete>
        </Space>
    );
};

export default SearchBox;
