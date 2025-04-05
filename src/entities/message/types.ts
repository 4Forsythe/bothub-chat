export type CreateMessageFormType = {
  chatId: string;
  message: string;
  platform?: 'MAIN';
};

export type CreateMessageResponseType = {
  id: string;
  role: 'assistant' | 'user';
  type: 'TEXT' | string;
  status: 'PENDING' | 'DONE' | string;
  tokens: number;
  action_type: string;
  user_id: string;
  chat_id: string;
  additional_content: string | null;
  tg_bot_message_id: string | null;
  disabled: boolean;
  content: string;
  request_id: string | null;
  transaction_id: string;
  model_id: string;
  created_at: string;
};

export type MessageType = {
  id: string;
  role: 'assistant' | 'user';
  choiced: boolean;
  version: number;
  set_id: string | null;
  previous_version_id: string | null;
  next_version_id: string | null;
  video_id: string | null;
  action_type: string | null;
  status: 'DONE' | 'PENDING';
  model_id: string | null;
  model_version: string | null;
  content: string;
  full_content: string | null;
  reasoning_content: string;
  reasoning_time_ms: number | null;
  search_status: string | null;
  search_results: string | null;
  isEncrypted: boolean;
  additional_content: string | null;
  chat_id: string;
  user_id: string;
  tokens: number;
  disabled: boolean;
  created_at: string;
  transaction_id: string;
  request_id: string | null;
  voice_id: string | null;
  job_id: string | null;
  mj_mode: string | null;
  platform: string | null;
  images: Array<any>;
  voice: string | null;
  video: string | null;
};

export type StreamingMessageType = {
  name: string;
  data: {
    message: MessageType;
  };
};
