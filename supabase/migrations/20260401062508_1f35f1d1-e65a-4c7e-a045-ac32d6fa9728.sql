
-- Drop all existing overly permissive policies
DROP POLICY IF EXISTS "Allow public read access to crew_health_data" ON public.crew_health_data;
DROP POLICY IF EXISTS "Allow public insert to crew_health_data" ON public.crew_health_data;

DROP POLICY IF EXISTS "Allow public read access to health_alerts" ON public.health_alerts;
DROP POLICY IF EXISTS "Allow public insert to health_alerts" ON public.health_alerts;
DROP POLICY IF EXISTS "Allow public update to health_alerts" ON public.health_alerts;

DROP POLICY IF EXISTS "Allow public read access to iot_devices" ON public.iot_devices;
DROP POLICY IF EXISTS "Allow public insert to iot_devices" ON public.iot_devices;
DROP POLICY IF EXISTS "Allow public update to iot_devices" ON public.iot_devices;

-- crew_health_data: authenticated only
CREATE POLICY "Authenticated read crew_health_data" ON public.crew_health_data FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert crew_health_data" ON public.crew_health_data FOR INSERT TO authenticated WITH CHECK (true);

-- health_alerts: authenticated only
CREATE POLICY "Authenticated read health_alerts" ON public.health_alerts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert health_alerts" ON public.health_alerts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update health_alerts" ON public.health_alerts FOR UPDATE TO authenticated USING (true);

-- iot_devices: authenticated only
CREATE POLICY "Authenticated read iot_devices" ON public.iot_devices FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert iot_devices" ON public.iot_devices FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update iot_devices" ON public.iot_devices FOR UPDATE TO authenticated USING (true);
