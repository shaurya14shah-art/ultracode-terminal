"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal, Users, Play, Shield, Code, Settings, Bug, Layout, Cpu, Search, Briefcase, Zap, FileJson, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Agent = {
  id: string;
  name: string;
  role: string;
  icon: string;
  color: string;
  description: string;
  imgUrl: string;
  status: "idle" | "working" | "reviewing" | "done";
};

const AGENTS: Agent[] = [
  { id: "owl", name: "Architect", role: "owl", icon: "Briefcase", color: "text-blue-400", imgUrl: "/agents/owl_architect_1788695517566.jpg", description: "Plans the system, defines interfaces", status: "idle" },
  { id: "ant", name: "Implementer", role: "ants", icon: "Code", color: "text-orange-400", imgUrl: "/agents/ant_implementer_1788695530872.jpg", description: "Writes the core code", status: "idle" },
  { id: "hawk", name: "Reviewer", role: "hawk", icon: "Search", color: "text-red-400", imgUrl: "/agents/hawk_reviewer_1788695552965.jpg", description: "Adversarial code review", status: "idle" },
  { id: "hound", name: "Tester", role: "hound", icon: "Bug", color: "text-green-400", imgUrl: "/agents/hound_tester_1788695581168.jpg", description: "Writes and runs tests", status: "idle" },
  { id: "octopus", name: "Integrator", role: "octopus", icon: "Cpu", color: "text-purple-400", imgUrl: "/agents/octopus_integrator_1788695596163.jpg", description: "Merges everything", status: "idle" },
  { id: "fox", name: "Security", role: "fox", icon: "Shield", color: "text-gray-400", imgUrl: "/agents/fox_security_1788695611827.jpg", description: "Penetration testing and safety", status: "idle" },
  { id: "peacock", name: "UI/UX", role: "peacock", icon: "Layout", color: "text-pink-400", imgUrl: "/agents/peacock_ui_1788695756933.jpg", description: "Frontend design and styles", status: "idle" },
  { id: "beaver", name: "DevOps", role: "beaver", icon: "Settings", color: "text-amber-600", imgUrl: "/agents/beaver_devops_1788695767538.jpg", description: "Handles local Mac control & scripts", status: "idle" },
  { id: "dolphin", name: "Researcher", role: "dolphin", icon: "FileJson", color: "text-cyan-400", imgUrl: "/agents/dolphin_researcher_1788695797268.jpg", description: "Web search and documentation", status: "idle" },
  { id: "bee", name: "Microcoder", role: "bee", icon: "Zap", color: "text-yellow-400", imgUrl: "/agents/bee_microcoder_1788695811848.jpg", description: "Part of the 100-agent swarm", status: "idle" }
];

type LogMessage = {
  id: number;
  timestamp: string;
  sender: string;
  content: string;
  isSystem: boolean;
};

export default function Home() {
  const [agents, setAgents] = useState<Agent[]>(AGENTS);
  const [logs, setLogs] = useState<LogMessage[]>([
    { id: 1, timestamp: new Date().toLocaleTimeString(), sender: "System", content: "Ultracode Terminal Initialized.", isSystem: true },
    { id: 2, timestamp: new Date().toLocaleTimeString(), sender: "System", content: "Antigravity Brain connected. Hyper Swarm ready.", isSystem: true }
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (sender: string, content: string, isSystem = false) => {
    setLogs(prev => [...prev, {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      sender,
      content,
      isSystem
    }]);
  };

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addLog("User", input, false);
    const cmd = input;
    setInput("");
    
    if (cmd.toLowerCase().startsWith("ultracode") || cmd.toLowerCase().startsWith("summon")) {
      setIsProcessing(true);
      addLog("System", "Initiating Ultracode Swarm...", true);
      
      // Simulate changing agent status
      setTimeout(() => {
        setAgents(prev => prev.map(a => a.id === "owl" ? { ...a, status: "working" } : a));
        addLog("Owl", "Analyzing request and breaking down into dependency graph.", false);
      }, 1000);
      
      setTimeout(() => {
        setAgents(prev => prev.map(a => ["ant", "bee", "peacock"].includes(a.id) ? { ...a, status: "working" } : a));
        addLog("System", "Wave 1: Parallel dispatch initialized. Squads deployed.", true);
      }, 3000);
      
      setTimeout(() => {
        setIsProcessing(false);
        setAgents(prev => prev.map(a => ({ ...a, status: "idle" })));
        addLog("System", "Execution completed.", true);
      }, 8000);

    } else {
      setTimeout(() => {
        addLog("System", `Command not recognized by Swarm. Use 'ultracode <task>'`, true);
      }, 500);
    }
  };

  return (
    <div className="flex h-screen bg-[#0f111a] text-gray-300 font-sans overflow-hidden">
      
      {/* SIDEBAR: Agent Status */}
      <div className="w-80 bg-[#161925] border-r border-gray-800 p-4 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-6 text-white font-semibold text-lg">
          <Terminal className="text-cyan-400" />
          <h1>Ultracode Swarm</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {agents.map((agent) => (
            <div 
              key={agent.id} 
              className={`p-3 rounded-lg border ${agent.status === "working" ? "border-cyan-500/50 bg-cyan-500/10" : "border-gray-800 bg-[#0f111a]"} transition-all duration-300`}
            >
              <div className="flex gap-3 items-center">
                <div className="relative">
                  <Image src={agent.imgUrl} alt={agent.name} width={40} height={40} className="rounded-md object-cover border border-gray-700" />
                  {agent.status === "working" && (
                    <div className="absolute -bottom-1 -right-1">
                       <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-100">{agent.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${agent.status === "working" ? "bg-cyan-500/20 text-cyan-400" : "bg-gray-800 text-gray-400"}`}>
                      {agent.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <span className={agent.color}>●</span> {agent.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN: Terminal Area */}
      <div className="flex-1 flex flex-col relative h-full">
        {/* Terminal Header */}
        <div className="h-12 border-b border-gray-800 flex items-center px-4 bg-[#161925] justify-between">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
          </div>
          <div className="text-xs font-mono text-gray-500">Antigravity Brain // Local Mac // Swarm 100 Cap</div>
        </div>

        {/* Terminal Output */}
        <div className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-2">
          <AnimatePresence initial={false}>
            {logs.map((log) => (
              <motion.div 
                key={log.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${log.isSystem ? 'text-gray-400' : (log.sender === 'User' ? 'text-white' : 'text-cyan-300')}`}
              >
                <div className="text-gray-600 shrink-0">[{log.timestamp}]</div>
                <div className="shrink-0 w-20 truncate">{log.sender} &gt;</div>
                <div className="flex-1 whitespace-pre-wrap">{log.content}</div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Status Bar for Swarm */}
        {isProcessing && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-[#161925] border border-cyan-900/50 rounded-full px-6 py-2 shadow-[0_0_20px_rgba(6,182,212,0.15)] flex items-center gap-3">
            <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
            <span className="text-sm font-medium text-cyan-400 tracking-wide">ULTRACODE HYPER-SWARM ACTIVE</span>
            <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden ml-2">
              <motion.div 
                className="h-full bg-cyan-400"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 8, ease: "linear" }}
              />
            </div>
          </div>
        )}

        {/* Command Input */}
        <div className="p-4 border-t border-gray-800 bg-[#0f111a]">
          <form onSubmit={handleCommand} className="relative flex items-center">
            <div className="absolute left-4 text-cyan-500">
              <Play className="w-4 h-4" />
            </div>
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Summon swarm (e.g. ultracode build me a snake game in python)"
              className="w-full bg-[#161925] border border-gray-800 rounded-lg py-3 pl-12 pr-4 text-gray-200 font-mono text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-gray-600"
              disabled={isProcessing}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
