export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      crew_health_data: {
        Row: {
          activity_level: string | null
          body_temperature: number | null
          created_at: string
          crew_member: string
          device_id: string | null
          heart_rate: number | null
          hydration: number | null
          id: string
          is_simulated: boolean
          oxygen_level: number | null
          recorded_at: string
          sleep_quality: number | null
          stress_level: number | null
          user_id: string | null
        }
        Insert: {
          activity_level?: string | null
          body_temperature?: number | null
          created_at?: string
          crew_member: string
          device_id?: string | null
          heart_rate?: number | null
          hydration?: number | null
          id?: string
          is_simulated?: boolean
          oxygen_level?: number | null
          recorded_at?: string
          sleep_quality?: number | null
          stress_level?: number | null
          user_id?: string | null
        }
        Update: {
          activity_level?: string | null
          body_temperature?: number | null
          created_at?: string
          crew_member?: string
          device_id?: string | null
          heart_rate?: number | null
          hydration?: number | null
          id?: string
          is_simulated?: boolean
          oxygen_level?: number | null
          recorded_at?: string
          sleep_quality?: number | null
          stress_level?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crew_health_data_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "iot_devices"
            referencedColumns: ["id"]
          },
        ]
      }
      crew_profiles: {
        Row: {
          age: number | null
          avatar_initials: string
          bio: string | null
          blood_type: string | null
          created_at: string
          crew_member_id: string
          id: string
          name: string
          role: string
          specialization: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          age?: number | null
          avatar_initials?: string
          bio?: string | null
          blood_type?: string | null
          created_at?: string
          crew_member_id: string
          id?: string
          name: string
          role?: string
          specialization?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          age?: number | null
          avatar_initials?: string
          bio?: string | null
          blood_type?: string | null
          created_at?: string
          crew_member_id?: string
          id?: string
          name?: string
          role?: string
          specialization?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      health_alerts: {
        Row: {
          acknowledged_at: string | null
          alert_type: string
          created_at: string
          crew_member: string
          id: string
          is_acknowledged: boolean
          message: string
          metric_name: string | null
          metric_value: number | null
          severity: string
          threshold_value: number | null
          user_id: string | null
        }
        Insert: {
          acknowledged_at?: string | null
          alert_type: string
          created_at?: string
          crew_member: string
          id?: string
          is_acknowledged?: boolean
          message: string
          metric_name?: string | null
          metric_value?: number | null
          severity?: string
          threshold_value?: number | null
          user_id?: string | null
        }
        Update: {
          acknowledged_at?: string | null
          alert_type?: string
          created_at?: string
          crew_member?: string
          id?: string
          is_acknowledged?: boolean
          message?: string
          metric_name?: string | null
          metric_value?: number | null
          severity?: string
          threshold_value?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      iot_devices: {
        Row: {
          battery_level: number | null
          created_at: string
          crew_member: string
          device_name: string
          device_type: string
          firmware_version: string | null
          id: string
          is_connected: boolean
          last_sync_at: string | null
          signal_strength: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          battery_level?: number | null
          created_at?: string
          crew_member: string
          device_name: string
          device_type?: string
          firmware_version?: string | null
          id?: string
          is_connected?: boolean
          last_sync_at?: string | null
          signal_strength?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          battery_level?: number | null
          created_at?: string
          crew_member?: string
          device_name?: string
          device_type?: string
          firmware_version?: string | null
          id?: string
          is_connected?: boolean
          last_sync_at?: string | null
          signal_strength?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      crew_role:
        | "commander"
        | "pilot"
        | "engineer"
        | "scientist"
        | "medical_officer"
        | "specialist"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      crew_role: [
        "commander",
        "pilot",
        "engineer",
        "scientist",
        "medical_officer",
        "specialist",
      ],
    },
  },
} as const
