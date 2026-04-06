import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, UserPlus, Edit3, Trash2, Save, X, Heart, Thermometer,
  Droplets, Brain, Activity, Plus, ChevronDown, ChevronUp
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import HoloPanel from "@/components/HoloPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface CrewProfile {
  id: string;
  crew_member_id: string;
  name: string;
  role: string;
  avatar_initials: string;
  bio: string | null;
  age: number | null;
  blood_type: string | null;
  specialization: string | null;
  status: string;
}

interface SensorEntry {
  crew_member: string;
  heart_rate: number | null;
  oxygen_level: number | null;
  body_temperature: number | null;
  hydration: number | null;
  stress_level: number | null;
  sleep_quality: number | null;
  activity_level: string;
}

const ROLES = ["commander", "pilot", "engineer", "scientist", "medical_officer", "specialist"];
const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const ACTIVITY_LEVELS = ["resting", "light_activity", "exercise", "sleeping", "eva"];

const emptyProfile: Omit<CrewProfile, "id"> = {
  crew_member_id: "",
  name: "",
  role: "specialist",
  avatar_initials: "",
  bio: "",
  age: null,
  blood_type: null,
  specialization: null,
  status: "active",
};

const emptySensor: SensorEntry = {
  crew_member: "",
  heart_rate: null,
  oxygen_level: null,
  body_temperature: null,
  hydration: null,
  stress_level: null,
  sleep_quality: null,
  activity_level: "resting",
};

const CrewManagementPage = () => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<CrewProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyProfile);
  const [sensorData, setSensorData] = useState(emptySensor);
  const [showSensorForm, setShowSensorForm] = useState(false);
  const [expandedProfile, setExpandedProfile] = useState<string | null>(null);

  const fetchProfiles = async () => {
    const { data, error } = await supabase
      .from("crew_profiles")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      toast.error("Failed to load crew profiles");
      console.error(error);
    } else {
      setProfiles(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const generateInitials = (name: string) =>
    name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.crew_member_id.trim()) {
      toast.error("Name and Crew Member ID are required");
      return;
    }

    const initials = formData.avatar_initials || generateInitials(formData.name);
    const payload = { ...formData, avatar_initials: initials, user_id: user?.id };

    if (editingId) {
      const { error } = await supabase
        .from("crew_profiles")
        .update(payload)
        .eq("id", editingId);
      if (error) {
        toast.error("Failed to update profile");
        return;
      }
      toast.success("Profile updated");
    } else {
      const { error } = await supabase.from("crew_profiles").insert(payload);
      if (error) {
        if (error.code === "23505") toast.error("Crew member ID already exists");
        else toast.error("Failed to create profile");
        return;
      }
      toast.success("Crew member added");
    }

    setShowAddForm(false);
    setEditingId(null);
    setFormData(emptyProfile);
    fetchProfiles();
  };

  const handleEdit = (profile: CrewProfile) => {
    setFormData(profile);
    setEditingId(profile.id);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("crew_profiles").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete profile");
      return;
    }
    toast.success("Profile removed");
    fetchProfiles();
  };

  const handleSensorSubmit = async () => {
    if (!sensorData.crew_member) {
      toast.error("Select a crew member");
      return;
    }

    const { error } = await supabase.from("crew_health_data").insert({
      crew_member: sensorData.crew_member,
      heart_rate: sensorData.heart_rate,
      oxygen_level: sensorData.oxygen_level,
      body_temperature: sensorData.body_temperature,
      hydration: sensorData.hydration,
      stress_level: sensorData.stress_level,
      sleep_quality: sensorData.sleep_quality,
      activity_level: sensorData.activity_level,
      is_simulated: false,
      user_id: user?.id,
    });

    if (error) {
      toast.error("Failed to submit sensor data");
      console.error(error);
      return;
    }
    toast.success("Sensor data recorded");
    setSensorData(emptySensor);
    setShowSensorForm(false);
  };

  const cancelForm = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData(emptyProfile);
  };

  return (
    <PageLayout>
      <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-orbitron font-bold text-foreground flex items-center gap-3">
                <Users className="w-7 h-7 text-primary" />
                CREW MANAGEMENT
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage crew profiles and submit sensor data
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => { setShowAddForm(true); setEditingId(null); setFormData(emptyProfile); }}
                className="gap-2"
                size="sm"
              >
                <UserPlus className="w-4 h-4" /> Add Crew
              </Button>
              <Button
                onClick={() => setShowSensorForm(!showSensorForm)}
                variant="outline"
                className="gap-2"
                size="sm"
              >
                <Plus className="w-4 h-4" /> Add Sensor Data
              </Button>
            </div>
          </motion.div>

          {/* Crew Profile Form */}
          <AnimatePresence>
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <HoloPanel>
                  <h3 className="font-orbitron text-sm font-bold text-foreground mb-4">
                    {editingId ? "EDIT CREW MEMBER" : "ADD CREW MEMBER"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Crew Member ID *</label>
                      <Input
                        value={formData.crew_member_id}
                        onChange={e => setFormData(p => ({ ...p, crew_member_id: e.target.value }))}
                        placeholder="e.g. commander"
                        disabled={!!editingId}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Full Name *</label>
                      <Input
                        value={formData.name}
                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                        placeholder="e.g. Cmdr. Elena Vasquez"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Role</label>
                      <Select value={formData.role} onValueChange={v => setFormData(p => ({ ...p, role: v }))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {ROLES.map(r => <SelectItem key={r} value={r}>{r.replace("_", " ").toUpperCase()}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Initials</label>
                      <Input
                        value={formData.avatar_initials}
                        onChange={e => setFormData(p => ({ ...p, avatar_initials: e.target.value.toUpperCase().slice(0, 2) }))}
                        placeholder="Auto-generated"
                        maxLength={2}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Age</label>
                      <Input
                        type="number"
                        value={formData.age ?? ""}
                        onChange={e => setFormData(p => ({ ...p, age: e.target.value ? parseInt(e.target.value) : null }))}
                        placeholder="e.g. 38"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Blood Type</label>
                      <Select value={formData.blood_type ?? ""} onValueChange={v => setFormData(p => ({ ...p, blood_type: v }))}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          {BLOOD_TYPES.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs text-muted-foreground mb-1 block">Specialization</label>
                      <Input
                        value={formData.specialization ?? ""}
                        onChange={e => setFormData(p => ({ ...p, specialization: e.target.value }))}
                        placeholder="e.g. Aerospace Engineering, Astrobiology"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs text-muted-foreground mb-1 block">Bio</label>
                      <Textarea
                        value={formData.bio ?? ""}
                        onChange={e => setFormData(p => ({ ...p, bio: e.target.value }))}
                        placeholder="Brief background..."
                        rows={2}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 justify-end">
                    <Button variant="ghost" size="sm" onClick={cancelForm}><X className="w-4 h-4 mr-1" /> Cancel</Button>
                    <Button size="sm" onClick={handleSave}><Save className="w-4 h-4 mr-1" /> {editingId ? "Update" : "Save"}</Button>
                  </div>
                </HoloPanel>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sensor Data Form */}
          <AnimatePresence>
            {showSensorForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <HoloPanel variant="nebula">
                  <h3 className="font-orbitron text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" /> SUBMIT SENSOR DATA
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Crew Member *</label>
                      <Select value={sensorData.crew_member} onValueChange={v => setSensorData(p => ({ ...p, crew_member: v }))}>
                        <SelectTrigger><SelectValue placeholder="Select crew member" /></SelectTrigger>
                        <SelectContent>
                          {profiles.map(p => (
                            <SelectItem key={p.id} value={p.crew_member_id}>{p.name} ({p.crew_member_id})</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        <Heart className="w-3 h-3 text-destructive" /> Heart Rate (BPM)
                      </label>
                      <Input
                        type="number"
                        value={sensorData.heart_rate ?? ""}
                        onChange={e => setSensorData(p => ({ ...p, heart_rate: e.target.value ? parseInt(e.target.value) : null }))}
                        placeholder="72"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        <Droplets className="w-3 h-3 text-blue-400" /> Oxygen Level (%)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={sensorData.oxygen_level ?? ""}
                        onChange={e => setSensorData(p => ({ ...p, oxygen_level: e.target.value ? parseFloat(e.target.value) : null }))}
                        placeholder="98"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        <Thermometer className="w-3 h-3 text-orange-400" /> Temperature (°C)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={sensorData.body_temperature ?? ""}
                        onChange={e => setSensorData(p => ({ ...p, body_temperature: e.target.value ? parseFloat(e.target.value) : null }))}
                        placeholder="36.6"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        <Droplets className="w-3 h-3 text-cyan-400" /> Hydration (%)
                      </label>
                      <Input
                        type="number"
                        value={sensorData.hydration ?? ""}
                        onChange={e => setSensorData(p => ({ ...p, hydration: e.target.value ? parseInt(e.target.value) : null }))}
                        placeholder="85"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        <Brain className="w-3 h-3 text-purple-400" /> Stress Level (%)
                      </label>
                      <Input
                        type="number"
                        value={sensorData.stress_level ?? ""}
                        onChange={e => setSensorData(p => ({ ...p, stress_level: e.target.value ? parseInt(e.target.value) : null }))}
                        placeholder="30"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Sleep Quality (%)</label>
                      <Input
                        type="number"
                        value={sensorData.sleep_quality ?? ""}
                        onChange={e => setSensorData(p => ({ ...p, sleep_quality: e.target.value ? parseInt(e.target.value) : null }))}
                        placeholder="75"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Activity Level</label>
                      <Select value={sensorData.activity_level} onValueChange={v => setSensorData(p => ({ ...p, activity_level: v }))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {ACTIVITY_LEVELS.map(a => <SelectItem key={a} value={a}>{a.replace("_", " ").toUpperCase()}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 justify-end">
                    <Button variant="ghost" size="sm" onClick={() => setShowSensorForm(false)}>
                      <X className="w-4 h-4 mr-1" /> Cancel
                    </Button>
                    <Button size="sm" onClick={handleSensorSubmit}>
                      <Save className="w-4 h-4 mr-1" /> Submit Data
                    </Button>
                  </div>
                </HoloPanel>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Crew List */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : profiles.length === 0 ? (
            <HoloPanel>
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-orbitron text-lg text-foreground mb-2">No Crew Members</h3>
                <p className="text-sm text-muted-foreground mb-4">Add your first crew member to get started</p>
                <Button onClick={() => setShowAddForm(true)} className="gap-2">
                  <UserPlus className="w-4 h-4" /> Add Crew Member
                </Button>
              </div>
            </HoloPanel>
          ) : (
            <div className="grid gap-4">
              {profiles.map((profile, i) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <HoloPanel>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center font-orbitron text-lg font-bold text-primary">
                          {profile.avatar_initials}
                        </div>
                        <div>
                          <h3 className="font-orbitron text-sm font-bold text-foreground">{profile.name}</h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-primary font-mono">{profile.role.replace("_", " ").toUpperCase()}</span>
                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono ${
                              profile.status === "active" ? "bg-glow-green/20 text-glow-green" : "bg-muted text-muted-foreground"
                            }`}>
                              {profile.status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setExpandedProfile(expandedProfile === profile.id ? null : profile.id)}>
                          {expandedProfile === profile.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(profile)}>
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(profile.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedProfile === profile.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-border/30">
                            <div>
                              <span className="text-[10px] text-muted-foreground block">ID</span>
                              <span className="text-xs font-mono text-foreground">{profile.crew_member_id}</span>
                            </div>
                            {profile.age && (
                              <div>
                                <span className="text-[10px] text-muted-foreground block">AGE</span>
                                <span className="text-xs font-mono text-foreground">{profile.age}</span>
                              </div>
                            )}
                            {profile.blood_type && (
                              <div>
                                <span className="text-[10px] text-muted-foreground block">BLOOD TYPE</span>
                                <span className="text-xs font-mono text-foreground">{profile.blood_type}</span>
                              </div>
                            )}
                            {profile.specialization && (
                              <div>
                                <span className="text-[10px] text-muted-foreground block">SPECIALIZATION</span>
                                <span className="text-xs font-mono text-foreground">{profile.specialization}</span>
                              </div>
                            )}
                          </div>
                          {profile.bio && (
                            <p className="text-xs text-muted-foreground mt-3">{profile.bio}</p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </HoloPanel>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default CrewManagementPage;
