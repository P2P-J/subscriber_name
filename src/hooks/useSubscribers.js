import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";

const TOTAL = 1000;

export function useSubscribers() {
  const [subscribers, setSubscribers] = useState(() =>
    Array.from({ length: TOTAL }, (_, i) => String(i + 1)),
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const subscribersRef = useRef(subscribers);
  subscribersRef.current = subscribers;

  useEffect(() => {
    let cancelled = false;

    const fetchAll = async () => {
      const { data, error } = await supabase
        .from("subscribers")
        .select("id, name")
        .order("id", { ascending: true });

      if (cancelled) return;

      if (error) {
        setError(error);
        setLoading(false);
        return;
      }

      const next = Array.from({ length: TOTAL }, (_, i) => String(i + 1));
      for (const row of data ?? []) {
        if (row.id >= 1 && row.id <= TOTAL) {
          next[row.id - 1] = row.name;
        }
      }
      setSubscribers(next);
      setLoading(false);
    };

    fetchAll();

    const channel = supabase
      .channel("subscribers-realtime")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "subscribers" },
        (payload) => {
          const { id, name } = payload.new;
          if (id < 1 || id > TOTAL) return;
          const current = subscribersRef.current;
          if (current[id - 1] === name) return;
          const next = [...current];
          next[id - 1] = name;
          setSubscribers(next);
        },
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

  const updateSubscriber = useCallback(async (idx, value) => {
    const id = idx + 1;
    setSubscribers((prev) => {
      if (prev[idx] === value) return prev;
      const next = [...prev];
      next[idx] = value;
      return next;
    });

    const { error } = await supabase
      .from("subscribers")
      .update({ name: value, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      console.error("Failed to update subscriber:", error);
      return { error };
    }
    return { error: null };
  }, []);

  return { subscribers, loading, error, updateSubscriber };
}
