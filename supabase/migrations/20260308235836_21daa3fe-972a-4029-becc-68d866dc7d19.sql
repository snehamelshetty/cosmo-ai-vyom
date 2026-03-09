-- Create enum for crew member roles
CREATE TYPE public.crew_role AS ENUM ('commander', 'pilot', 'engineer', 'scientist', 'medical_officer', 'specialist');

-- Create table for IoT devices
CREATE TABLE public.iot_devices (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    device_name TEXT NOT NULL,
    device_type TEXT NOT NULL DEFAULT 'wearable_sensor',
    crew_member TEXT NOT NULL,
    is_connected BOOLEAN NOT NULL DEFAULT false,
    battery_level INTEGER DEFAULT 100 CHECK (battery_level >= 0 AND battery_level <= 100),
    signal_strength INTEGER DEFAULT 100 CHECK (signal_strength >= 0 AND signal_strength <= 100),
    firmware_version TEXT,
    last_sync_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for crew health data from IoT sensors
CREATE TABLE public.crew_health_data (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id UUID REFERENCES public.iot_devices(id) ON DELETE SET NULL,
    crew_member TEXT NOT NULL,
    heart_rate INTEGER CHECK (heart_rate >= 0 AND heart_rate <= 300),
    oxygen_level DECIMAL(5,2) CHECK (oxygen_level >= 0 AND oxygen_level <= 100),
    body_temperature DECIMAL(4,2) CHECK (body_temperature >= 30 AND body_temperature <= 45),
    hydration INTEGER CHECK (hydration >= 0 AND hydration <= 100),
    stress_level INTEGER CHECK (stress_level >= 0 AND stress_level <= 100),
    sleep_quality INTEGER CHECK (sleep_quality >= 0 AND sleep_quality <= 100),
    activity_level TEXT DEFAULT 'resting',
    is_simulated BOOLEAN NOT NULL DEFAULT true,
    recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for health alerts/warnings
CREATE TABLE public.health_alerts (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    crew_member TEXT NOT NULL,
    alert_type TEXT NOT NULL,
    severity TEXT NOT NULL DEFAULT 'warning' CHECK (severity IN ('info', 'warning', 'critical')),
    message TEXT NOT NULL,
    metric_name TEXT,
    metric_value DECIMAL(10,2),
    threshold_value DECIMAL(10,2),
    is_acknowledged BOOLEAN NOT NULL DEFAULT false,
    acknowledged_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.iot_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crew_health_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_alerts ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since this is a demo/simulation)
CREATE POLICY "Allow public read access to iot_devices" 
ON public.iot_devices 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert to iot_devices" 
ON public.iot_devices 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update to iot_devices" 
ON public.iot_devices 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow public read access to crew_health_data" 
ON public.crew_health_data 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert to crew_health_data" 
ON public.crew_health_data 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public read access to health_alerts" 
ON public.health_alerts 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert to health_alerts" 
ON public.health_alerts 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update to health_alerts" 
ON public.health_alerts 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for iot_devices timestamp updates
CREATE TRIGGER update_iot_devices_updated_at
BEFORE UPDATE ON public.iot_devices
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for crew_health_data table
ALTER PUBLICATION supabase_realtime ADD TABLE public.crew_health_data;
ALTER PUBLICATION supabase_realtime ADD TABLE public.iot_devices;
ALTER PUBLICATION supabase_realtime ADD TABLE public.health_alerts;

-- Create indexes for better query performance
CREATE INDEX idx_crew_health_data_crew_member ON public.crew_health_data(crew_member);
CREATE INDEX idx_crew_health_data_recorded_at ON public.crew_health_data(recorded_at DESC);
CREATE INDEX idx_health_alerts_crew_member ON public.health_alerts(crew_member);
CREATE INDEX idx_health_alerts_created_at ON public.health_alerts(created_at DESC);