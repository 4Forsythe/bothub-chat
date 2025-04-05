export type ModelType = {
  id: string;
  label: string;
  description: string | null;
  icon_id: string | null;
  prefix: string;
  context_length: number;
  max_tokens: number;
  provider_id: string | null;
  owned_by: string;
  parent_id: string | null;
  message_color: string | null;
  disabled: boolean;
  disabledWeb: boolean;
  order: number;
  used_count: number;
  created_at: string;
  icon: string | null;
  parent: string | null;
  functions: ModelFunctionType[];
  children: ChildrenModelType[];
  is_allowed: boolean;
  allowed_plan_type: string | null;
  is_default: boolean;
};

type ChildrenModelType = {
  id: string;
};

type ModelFunctionType = {
  id: string;
  name: string;
  label: string;
  is_default: boolean;
  features: string[];
  order: number;
  model_id: string;
  used_count: number;
  created_at: string;
};
