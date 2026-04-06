import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

interface HealthDataPayload {
  crew_member: string;
  heart_rate?: number;
  oxygen_level?: number;
  body_temperature?: number;
  hydration?: number;
  stress_level?: number;
  sleep_quality?: number;
  activity_level?: string;
  device_id?: string;
  timestamp?: string;
}

interface DeviceStatusPayload {
  device_id: string;
  is_connected: boolean;
  battery_level?: number;
  signal_strength?: number;
}

// Health thresholds for AI analysis
const THRESHOLDS = {
  heart_rate: { low: 50, high: 100, critical_high: 120 },
  oxygen_level: { low: 94, critical_low: 90 },
  body_temperature: { low: 36.0, high: 37.5, critical_high: 38.5 },
  stress_level: { high: 70, critical_high: 85 },
  hydration: { low: 60, critical_low: 40 },
};

function analyzeHealthData(data: HealthDataPayload): { alerts: Array<{ type: string; severity: string; message: string; metric: string; value: number; threshold: number }> } {
  const alerts: Array<{ type: string; severity: string; message: string; metric: string; value: number; threshold: number }> = [];

  if (data.heart_rate !== undefined) {
    if (data.heart_rate > THRESHOLDS.heart_rate.critical_high) {
      alerts.push({
        type: 'elevated_heart_rate',
        severity: 'critical',
        message: `Critical: Heart rate at ${data.heart_rate} BPM - immediate attention required`,
        metric: 'heart_rate',
        value: data.heart_rate,
        threshold: THRESHOLDS.heart_rate.critical_high,
      });
    } else if (data.heart_rate > THRESHOLDS.heart_rate.high) {
      alerts.push({
        type: 'elevated_heart_rate',
        severity: 'warning',
        message: `Elevated heart rate detected: ${data.heart_rate} BPM`,
        metric: 'heart_rate',
        value: data.heart_rate,
        threshold: THRESHOLDS.heart_rate.high,
      });
    } else if (data.heart_rate < THRESHOLDS.heart_rate.low) {
      alerts.push({
        type: 'low_heart_rate',
        severity: 'warning',
        message: `Low heart rate detected: ${data.heart_rate} BPM`,
        metric: 'heart_rate',
        value: data.heart_rate,
        threshold: THRESHOLDS.heart_rate.low,
      });
    }
  }

  if (data.oxygen_level !== undefined) {
    if (data.oxygen_level < THRESHOLDS.oxygen_level.critical_low) {
      alerts.push({
        type: 'critical_oxygen',
        severity: 'critical',
        message: `Critical: Blood oxygen at ${data.oxygen_level}% - immediate intervention needed`,
        metric: 'oxygen_level',
        value: data.oxygen_level,
        threshold: THRESHOLDS.oxygen_level.critical_low,
      });
    } else if (data.oxygen_level < THRESHOLDS.oxygen_level.low) {
      alerts.push({
        type: 'low_oxygen',
        severity: 'warning',
        message: `Low blood oxygen level: ${data.oxygen_level}%`,
        metric: 'oxygen_level',
        value: data.oxygen_level,
        threshold: THRESHOLDS.oxygen_level.low,
      });
    }
  }

  if (data.body_temperature !== undefined) {
    if (data.body_temperature > THRESHOLDS.body_temperature.critical_high) {
      alerts.push({
        type: 'high_temperature',
        severity: 'critical',
        message: `Critical: Body temperature at ${data.body_temperature}°C - fever detected`,
        metric: 'body_temperature',
        value: data.body_temperature,
        threshold: THRESHOLDS.body_temperature.critical_high,
      });
    } else if (data.body_temperature > THRESHOLDS.body_temperature.high) {
      alerts.push({
        type: 'elevated_temperature',
        severity: 'warning',
        message: `Elevated body temperature: ${data.body_temperature}°C`,
        metric: 'body_temperature',
        value: data.body_temperature,
        threshold: THRESHOLDS.body_temperature.high,
      });
    }
  }

  if (data.stress_level !== undefined) {
    if (data.stress_level > THRESHOLDS.stress_level.critical_high) {
      alerts.push({
        type: 'critical_stress',
        severity: 'critical',
        message: `Critical stress level: ${data.stress_level}% - psychological support recommended`,
        metric: 'stress_level',
        value: data.stress_level,
        threshold: THRESHOLDS.stress_level.critical_high,
      });
    } else if (data.stress_level > THRESHOLDS.stress_level.high) {
      alerts.push({
        type: 'high_stress',
        severity: 'warning',
        message: `High stress level detected: ${data.stress_level}%`,
        metric: 'stress_level',
        value: data.stress_level,
        threshold: THRESHOLDS.stress_level.high,
      });
    }
  }

  if (data.hydration !== undefined) {
    if (data.hydration < THRESHOLDS.hydration.critical_low) {
      alerts.push({
        type: 'critical_dehydration',
        severity: 'critical',
        message: `Critical: Hydration at ${data.hydration}% - immediate fluid intake required`,
        metric: 'hydration',
        value: data.hydration,
        threshold: THRESHOLDS.hydration.critical_low,
      });
    } else if (data.hydration < THRESHOLDS.hydration.low) {
      alerts.push({
        type: 'low_hydration',
        severity: 'warning',
        message: `Low hydration level: ${data.hydration}%`,
        metric: 'hydration',
        value: data.hydration,
        threshold: THRESHOLDS.hydration.low,
      });
    }
  }

  return { alerts };
}

// Helper to extract and validate the JWT from the Authorization header
async function getAuthenticatedUserId(req: Request): Promise<string | null> {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.replace('Bearer ', '');
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user.id;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const url = new URL(req.url);
    const path = url.pathname.split('/').pop();

    // Authenticate the user
    const userId = await getAuthenticatedUserId(req);
    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // POST /crew-health-data - Receive health data from IoT device
    if (req.method === 'POST' && (!path || path === 'crew-health-data')) {
      const payload: HealthDataPayload = await req.json();

      // Validate required fields
      if (!payload.crew_member) {
        return new Response(
          JSON.stringify({ error: 'crew_member is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Insert health data with user_id
      const { data: healthData, error: healthError } = await supabase
        .from('crew_health_data')
        .insert({
          crew_member: payload.crew_member,
          heart_rate: payload.heart_rate,
          oxygen_level: payload.oxygen_level,
          body_temperature: payload.body_temperature,
          hydration: payload.hydration,
          stress_level: payload.stress_level,
          sleep_quality: payload.sleep_quality,
          activity_level: payload.activity_level || 'resting',
          device_id: payload.device_id,
          is_simulated: false,
          recorded_at: payload.timestamp || new Date().toISOString(),
          user_id: userId,
        })
        .select()
        .single();

      if (healthError) {
        console.error('Health data insert error:', healthError);
        return new Response(
          JSON.stringify({ error: 'Failed to insert health data' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Analyze data and generate alerts
      const analysis = analyzeHealthData(payload);

      // Insert any alerts with user_id
      if (analysis.alerts.length > 0) {
        const alertInserts = analysis.alerts.map(alert => ({
          crew_member: payload.crew_member,
          alert_type: alert.type,
          severity: alert.severity,
          message: alert.message,
          metric_name: alert.metric,
          metric_value: alert.value,
          threshold_value: alert.threshold,
          user_id: userId,
        }));

        await supabase.from('health_alerts').insert(alertInserts);
      }

      // Update device last sync time if device_id provided
      if (payload.device_id) {
        await supabase
          .from('iot_devices')
          .update({ last_sync_at: new Date().toISOString(), is_connected: true })
          .eq('id', payload.device_id)
          .eq('user_id', userId);
      }

      return new Response(
        JSON.stringify({
          success: true,
          data: healthData,
          alerts: analysis.alerts,
          message: `Health data recorded for ${payload.crew_member}`,
        }),
        { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // POST /device-status - Update device connection status
    if (req.method === 'POST' && path === 'device-status') {
      const payload: DeviceStatusPayload = await req.json();

      if (!payload.device_id) {
        return new Response(
          JSON.stringify({ error: 'device_id is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { data, error } = await supabase
        .from('iot_devices')
        .update({
          is_connected: payload.is_connected,
          battery_level: payload.battery_level,
          signal_strength: payload.signal_strength,
          last_sync_at: new Date().toISOString(),
        })
        .eq('id', payload.device_id)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        return new Response(
          JSON.stringify({ error: 'Failed to update device status' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, data }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // GET /devices - List user's devices
    if (req.method === 'GET' && path === 'devices') {
      const { data, error } = await supabase
        .from('iot_devices')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        return new Response(
          JSON.stringify({ error: 'Failed to fetch devices' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ devices: data }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // GET /latest - Get latest health data for authenticated user
    if (req.method === 'GET' && path === 'latest') {
      const crewMember = url.searchParams.get('crew_member');
      
      let query = supabase
        .from('crew_health_data')
        .select('*')
        .eq('user_id', userId)
        .order('recorded_at', { ascending: false })
        .limit(crewMember ? 1 : 10);

      if (crewMember) {
        query = query.eq('crew_member', crewMember);
      }

      const { data, error } = await query;

      if (error) {
        return new Response(
          JSON.stringify({ error: 'Failed to fetch health data' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // GET /alerts - Get user's active alerts
    if (req.method === 'GET' && path === 'alerts') {
      const { data, error } = await supabase
        .from('health_alerts')
        .select('*')
        .eq('user_id', userId)
        .eq('is_acknowledged', false)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) {
        return new Response(
          JSON.stringify({ error: 'Failed to fetch alerts' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ alerts: data }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Not found' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
