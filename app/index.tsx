import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Auth from "@/components/Auth";
import Account from "@/components/Account";
import { Session } from "@supabase/supabase-js";
import { Text, View } from "react-native";

export default function Index() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#25292e",
      }}
    >
      {session && session.user ? (
        <>
          <Text>Logged in!!</Text>
          <Account key={session.user.id} session={session} />
        </>
      ) : (
        <Auth />
      )}
    </View>
  );
}
