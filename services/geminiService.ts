import { Weather } from '../types';

// Local database of CBT reframing quotes
const SADNESS_QUOTES = [ // Rain
  "苔藓不需要知道石头的过去，它只管生长。",
  "悲伤是雨水，它会汇入大海，也会滋养青苔。",
  "允许自己像石头一样静止，直到光再次降临。",
  "眼泪洗过的视线，往往看得更清。",
  "有些重量，是为了让你稳稳地落在地上。"
];

const ANXIETY_QUOTES = [ // Storm
  "允许杂音存在，就像允许风经过。",
  "暴风雨不会永远停留，正如情绪终会过境。",
  "你不需要控制海浪，只需要学会冲浪。",
  "把坚硬的愤怒刻在石头上，让时间把它磨平。",
  "深呼吸，这一刻你是安全的。"
];

const GENERAL_QUOTES = [ // Sun, Cloud
  "万物皆有裂痕，那是光照进来的地方。",
  "在此刻停留，不为过去担忧，不为未来焦虑。",
  "心若不动，风又奈何。",
  "问题本身，往往藏着答案的种子。",
  "让时间去做剩下的事。"
];

export const generateInsight = async (worry: string, weather: string): Promise<string> => {
  // Simulate a brief "thinking" pause
  await new Promise(resolve => setTimeout(resolve, 600));

  let quotes = GENERAL_QUOTES;
  if (weather === Weather.RAIN) quotes = SADNESS_QUOTES;
  if (weather === Weather.STORM) quotes = ANXIETY_QUOTES;

  // Random selection
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};