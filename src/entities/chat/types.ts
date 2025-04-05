import type { ModelType } from '@/entities/model';

export type CreateChatFormType = {
  modelId?: string;
  name: string;
  platform?: 'WEB';
};

export type ChatsResponseType = {
  data: ChatType[];
  pages: number;
};

export type ChatType = {
  id: string;
  name: string;
  group_id: string | null;
  model_id: string;
  model_function_id: string | null;
  created_at: string;
  last_message_at: string | null;
  user_id: string;
  highlight: string | null;
  initial: boolean;
  platform: string;
  total_caps: number;
  order: number;
  deleted: boolean;
  model: ModelType;
  settings: ChatSettingsType;
};

export type ChatSettingsType = {
  id: string;
  text_id: string;
  image_id: string | null;
  mj_id: string | null;
  speech_id: string | null;
  stt_id: string | null;
  replicateImage_id: string | null;
  chat_id: string;
  created_at: string;
  text: ChatSettingsTextType;
  image: string | null;
  speech: string | null;
  replicateImage: string | null;
  mj: string | null;
};

export type ChatSettingsTextType = {
  id: string;
  model: string;
  system_prompt: string;
  full_system_prompt: string | null;
  system_prompt_tokens: number;
  temperature: number;
  top_p: number;
  presence_penalty: number;
  frequency_penalty: number;
  max_tokens: number;
  include_context: boolean;
  preset_id: string | null;
  analyze_urls: boolean;
  enable_web_search: boolean;
  created_at: string;
};
