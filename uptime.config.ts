// Clean, deployable Uptimeflare configuration
import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config';

const pageConfig: PageConfig = {
  title: '服务状态页面',
  links: [
    { link: 'https://github.com/kingdomes', label: 'GitHub' },
    { link: 'https://115411.xyz/', label: 'Blog' },
    { link: 'mailto:admin@115411.xyz', label: 'Email Me', highlight: true },
  ],
  group: {
    '🌐 Public': ['campus_wall', 'blog_monitor', 'uptimeflare_monitor'],
    '🔐 Private': ['router_ssh'],
  },
};

const workerConfig: WorkerConfig = {
  kvWriteCooldownMinutes: 3,
  monitors: [
    {
      id: 'campus_wall',
      name: '🧱 校园墙',
      method: 'GET',
      target: 'https://ong.pp.ua',
      tooltip: '普通的校园墙',
      statusPageLink: 'https://ong.pp.ua',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
      headers: { 'User-Agent': 'Uptimeflare' },
      responseForbiddenKeyword: 'bad gateway',
      checkProxyFallback: true,
    },
    {
      id: 'blog_monitor',
      name: '📖 Blog',
      method: 'GET',
      target: 'https://115411.xyz',
      tooltip: '个人博客',
      statusPageLink: 'https://115411.xyz',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
      headers: { 'User-Agent': 'Uptimeflare' },
      responseForbiddenKeyword: 'bad gateway',
      checkProxyFallback: true,
    },
    {
      id: 'uptimeflare_monitor',
      name: '🛠️ UptimeFlare Demo',
      method: 'GET',
      target: 'https://serve.ong.pp.ua',
      tooltip: '自己监控自己',
      statusPageLink: 'https://serve.ong.pp.ua',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
      headers: { 'User-Agent': 'Uptimeflare' },
      responseForbiddenKeyword: 'bad gateway',
      checkProxyFallback: true,
    },
    {
      id: 'router_ssh',
      name: '🔐 Router SSH',
      method: 'TCP_PING',
      target: '52.65.31.188:22',
      tooltip: 'SSH 可用性检测',
      statusPageLink: '',
      timeout: 50000,
    },
  ],
  notification: {
    appriseApiServer: 'https://apprise.example.com/notify',
    recipientUrl: 'tgram://bottoken/ChatID',
    timeZone: 'Asia/Shanghai',
    gracePeriod: 5,
    skipNotificationIds: [],
  },
  callbacks: {
    onStatusChange: async (env, monitor, isUp, timeIncidentStart, timeNow, reason) => {
      // 可用于日志上报或自定义推送
    },
    onIncident: async (env, monitor, timeIncidentStart, timeNow, reason) => {
      // 可用于周期性提醒持久故障
    },
  },
};

const maintenances: MaintenanceConfig[] = [
  {
    monitors: ['campus_wall', 'blog_monitor'],
    title: '服务器维护公告',
    body: '例行安全更新与系统优化维护期间，部分服务可能短暂中断。',
    start: '2025-04-27T00:00:00+08:00',
    end: '2025-04-30T00:00:00+08:00',
    color: 'blue',
  },
];

export { pageConfig, workerConfig, maintenances };
