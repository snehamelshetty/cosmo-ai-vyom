import { supabase } from '@/integrations/supabase/client';

export interface HealthMetrics {
  crew_member: string;
  heart_rate: number;
  oxygen_level: number;
  body_temperature: number;
  hydration: number;
  stress_level: number;
  sleep_quality: number;
  activity_level: string;
  recorded_at: string;
  is_simulated: boolean;
}

export interface IoTDevice {
  id: string;
  device_name: string;
  device_type: string;
  crew_member: string;
  is_connected: boolean;
  battery_level: number;
  signal_strength: number;
  firmware_version: string | null;
  last_sync_at: string | null;
}

export interface HealthAlert {
  id: string;
  crew_member: string;
  alert_type: string;
  severity: 'info' | 'warning' | 'critical';
  message: string;
  metric_name: string | null;
  metric_value: number | null;
  threshold_value: number | null;
  is_acknowledged: boolean;
  created_at: string;
}

// Helper to get current user id
const getCurrentUserId = async (): Promise<string | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id ?? null;
};

// Simulated data generator for demo mode
export const generateSimulatedData = (crewMember: string): HealthMetrics => {
  const baseHR = 70 + Math.floor(Math.random() * 15);
  const baseO2 = 96 + Math.floor(Math.random() * 3);
  const baseTemp = 36.4 + Math.random() * 0.8;
  
  return {
    crew_member: crewMember,
    heart_rate: baseHR + Math.floor(Math.random() * 10 - 5),
    oxygen_level: baseO2 + Math.random() * 2 - 1,
    body_temperature: parseFloat(baseTemp.toFixed(1)),
    hydration: 75 + Math.floor(Math.random() * 20),
    stress_level: 25 + Math.floor(Math.random() * 30),
    sleep_quality: 60 + Math.floor(Math.random() * 35),
    activity_level: ['resting', 'light_activity', 'exercise', 'sleeping'][Math.floor(Math.random() * 4)],
    recorded_at: new Date().toISOString(),
    is_simulated: true,
  };
};

// Fetch latest health data from database (scoped to current user via RLS)
export const fetchLatestHealthData = async (crewMember?: string) => {
  let query = supabase
    .from('crew_health_data')
    .select('*')
    .order('recorded_at', { ascending: false });

  if (crewMember) {
    query = query.eq('crew_member', crewMember).limit(1);
  } else {
    query = query.limit(50);
  }

  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching health data:', error);
    return null;
  }
  
  return data;
};

// Fetch health data history for charts
export const fetchHealthHistory = async (crewMember: string, hours: number = 24) => {
  const startTime = new Date();
  startTime.setHours(startTime.getHours() - hours);

  const { data, error } = await supabase
    .from('crew_health_data')
    .select('*')
    .eq('crew_member', crewMember)
    .gte('recorded_at', startTime.toISOString())
    .order('recorded_at', { ascending: true });

  if (error) {
    console.error('Error fetching health history:', error);
    return [];
  }

  return data || [];
};

// Fetch all IoT devices (scoped to current user via RLS)
export const fetchDevices = async (): Promise<IoTDevice[]> => {
  const { data, error } = await supabase
    .from('iot_devices')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching devices:', error);
    return [];
  }

  return data || [];
};

// Fetch active health alerts (scoped to current user via RLS)
export const fetchHealthAlerts = async (): Promise<HealthAlert[]> => {
  const { data, error } = await supabase
    .from('health_alerts')
    .select('*')
    .eq('is_acknowledged', false)
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Error fetching alerts:', error);
    return [];
  }

  return (data || []) as HealthAlert[];
};

// Acknowledge an alert
export const acknowledgeAlert = async (alertId: string) => {
  const { error } = await supabase
    .from('health_alerts')
    .update({ is_acknowledged: true, acknowledged_at: new Date().toISOString() })
    .eq('id', alertId);

  if (error) {
    console.error('Error acknowledging alert:', error);
    return false;
  }

  return true;
};

// Insert simulated data into database with user_id
export const insertSimulatedData = async (metrics: HealthMetrics) => {
  const userId = await getCurrentUserId();
  if (!userId) {
    console.error('No authenticated user found');
    return false;
  }

  const { error } = await supabase
    .from('crew_health_data')
    .insert({
      crew_member: metrics.crew_member,
      heart_rate: metrics.heart_rate,
      oxygen_level: metrics.oxygen_level,
      body_temperature: metrics.body_temperature,
      hydration: metrics.hydration,
      stress_level: metrics.stress_level,
      sleep_quality: metrics.sleep_quality,
      activity_level: metrics.activity_level,
      is_simulated: true,
      recorded_at: metrics.recorded_at,
      user_id: userId,
    });

  if (error) {
    console.error('Error inserting simulated data:', error);
    return false;
  }

  return true;
};

// Register a new IoT device with user_id
export const registerDevice = async (device: Omit<IoTDevice, 'id'>) => {
  const userId = await getCurrentUserId();
  if (!userId) {
    console.error('No authenticated user found');
    return null;
  }

  const { data, error } = await supabase
    .from('iot_devices')
    .insert({ ...device, user_id: userId })
    .select()
    .single();

  if (error) {
    console.error('Error registering device:', error);
    return null;
  }

  return data;
};

// Subscribe to real-time health data updates
export const subscribeToHealthData = (
  callback: (payload: any) => void
) => {
  const channel = supabase
    .channel('health-data-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'crew_health_data',
      },
      callback
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

// Subscribe to device status updates
export const subscribeToDeviceUpdates = (
  callback: (payload: any) => void
) => {
  const channel = supabase
    .channel('device-status-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'iot_devices',
      },
      callback
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

// Subscribe to health alerts
export const subscribeToAlerts = (
  callback: (payload: any) => void
) => {
  const channel = supabase
    .channel('health-alerts')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'health_alerts',
      },
      callback
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

// Get API endpoint URL for IoT devices to send data
export const getApiEndpoint = () => {
  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
  return `https://${projectId}.supabase.co/functions/v1/crew-health-data`;
};

// Example ESP32 code snippet generator
export const generateEsp32CodeSnippet = (deviceId: string, crewMember: string) => {
  const endpoint = getApiEndpoint();
  
  return `
// ESP32 Health Sensor Code Example
// Install: ArduinoJson, WiFi, HTTPClient libraries
// NOTE: You must obtain a valid JWT token for authenticated requests.

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* endpoint = "${endpoint}";
const char* authToken = "YOUR_JWT_TOKEN"; // Obtain via Supabase auth
const char* deviceId = "${deviceId}";
const char* crewMember = "${crewMember}";

void sendHealthData(int heartRate, float oxygenLevel, float bodyTemp, int hydration, int stressLevel) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(endpoint);
    http.addHeader("Content-Type", "application/json");
    http.addHeader("Authorization", String("Bearer ") + authToken);
    
    StaticJsonDocument<256> doc;
    doc["crew_member"] = crewMember;
    doc["device_id"] = deviceId;
    doc["heart_rate"] = heartRate;
    doc["oxygen_level"] = oxygenLevel;
    doc["body_temperature"] = bodyTemp;
    doc["hydration"] = hydration;
    doc["stress_level"] = stressLevel;
    doc["timestamp"] = "2026-03-09T10:30:00Z"; // Use NTP time
    
    String payload;
    serializeJson(doc, payload);
    
    int httpResponseCode = http.POST(payload);
    Serial.println("Response: " + String(httpResponseCode));
    http.end();
  }
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);
  Serial.println("WiFi Connected");
}

void loop() {
  // Read your sensors here
  int heartRate = readHeartRateSensor();
  float oxygenLevel = readSpO2Sensor();
  float bodyTemp = readTempSensor();
  
  sendHealthData(heartRate, oxygenLevel, bodyTemp, 85, 30);
  delay(5000); // Send every 5 seconds
}
`;
};
