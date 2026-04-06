
-- Add user_id to crew_health_data
ALTER TABLE public.crew_health_data ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add user_id to health_alerts
ALTER TABLE public.health_alerts ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add user_id to iot_devices
ALTER TABLE public.iot_devices ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop all existing policies
DROP POLICY IF EXISTS "Authenticated insert crew_health_data" ON public.crew_health_data;
DROP POLICY IF EXISTS "Authenticated read crew_health_data" ON public.crew_health_data;
DROP POLICY IF EXISTS "Authenticated insert health_alerts" ON public.health_alerts;
DROP POLICY IF EXISTS "Authenticated read health_alerts" ON public.health_alerts;
DROP POLICY IF EXISTS "Authenticated update health_alerts" ON public.health_alerts;
DROP POLICY IF EXISTS "Authenticated insert iot_devices" ON public.iot_devices;
DROP POLICY IF EXISTS "Authenticated read iot_devices" ON public.iot_devices;
DROP POLICY IF EXISTS "Authenticated update iot_devices" ON public.iot_devices;

-- crew_health_data: users can only read/insert their own data
CREATE POLICY "Users read own crew_health_data"
  ON public.crew_health_data FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users insert own crew_health_data"
  ON public.crew_health_data FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- health_alerts: users can only read/insert/update their own alerts
CREATE POLICY "Users read own health_alerts"
  ON public.health_alerts FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users insert own health_alerts"
  ON public.health_alerts FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users update own health_alerts"
  ON public.health_alerts FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- iot_devices: users can only read/insert/update their own devices
CREATE POLICY "Users read own iot_devices"
  ON public.iot_devices FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users insert own iot_devices"
  ON public.iot_devices FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users update own iot_devices"
  ON public.iot_devices FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- Allow service role (edge function) to insert without user_id restriction
CREATE POLICY "Service role full access crew_health_data"
  ON public.crew_health_data FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access health_alerts"
  ON public.health_alerts FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access iot_devices"
  ON public.iot_devices FOR ALL TO service_role
  USING (true) WITH CHECK (true);
