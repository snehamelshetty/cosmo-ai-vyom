
CREATE TABLE public.crew_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  crew_member_id TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'specialist',
  avatar_initials TEXT NOT NULL DEFAULT 'XX',
  bio TEXT,
  age INTEGER,
  blood_type TEXT,
  specialization TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, crew_member_id)
);

ALTER TABLE public.crew_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own crew_profiles"
  ON public.crew_profiles FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users insert own crew_profiles"
  ON public.crew_profiles FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users update own crew_profiles"
  ON public.crew_profiles FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users delete own crew_profiles"
  ON public.crew_profiles FOR DELETE TO authenticated
  USING (user_id = auth.uid());

CREATE TRIGGER update_crew_profiles_updated_at
  BEFORE UPDATE ON public.crew_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
