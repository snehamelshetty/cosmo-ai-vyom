
CREATE POLICY "Users delete own crew_health_data"
  ON public.crew_health_data FOR DELETE TO authenticated
  USING (user_id = auth.uid());

ALTER PUBLICATION supabase_realtime DROP TABLE public.crew_health_data;
ALTER PUBLICATION supabase_realtime DROP TABLE public.iot_devices;
ALTER PUBLICATION supabase_realtime DROP TABLE public.health_alerts;
