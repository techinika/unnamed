"use client";

import AuthNav from "@/components/client/navigation/AuthNav";
import Nav from "@/components/client/navigation/Nav";
import { useAuth } from "@/lib/AuthContext";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AlbumArtwork } from "./album-artwork";
import FooterSection from "@/components/sections/footer/default";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";
import React, { useEffect } from "react";
import {
  collection,
  DocumentData,
  DocumentReference,
  getDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "@/db/firebase";
import { History } from "@/types/History";
import Loading from "@/app/loading";
import { CustomUser } from "../discussions/OneDiscussionPage";

export default function MainPage() {
  const { user } = useAuth();
  const [todayEvents, setTodayEvents] = React.useState<History[]>([]);
  const [weekEvents, setWeekEvents] = React.useState<History[]>([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const fetchHistoryEvents = async () => {
      const eventsRef = collection(db, "historyEvents");
      setLoading(true);
      try {
        const q = query(eventsRef);

        const today = new Date();
        const todayMonth = today.getMonth();
        const todayDate = today.getDate();
        const startOfWeek = new Date();
        startOfWeek.setHours(0, 0, 0, 0);
        startOfWeek.setDate(today.getDate() - today.getDay());

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        const unsubscribe = onSnapshot(
          q,
          async (snapshot) => {
            const eventsList: History[] = [];

            for (const doc of snapshot.docs) {
              const docData = doc.data();
              const userRef =
                docData?.createdBy as DocumentReference<DocumentData>;
              const institutionRef =
                docData?.institutionOwning as DocumentReference<DocumentData>;

              let userData: CustomUser | null = null;
              let institutionData: { id: string; name: string } | null = null;

              try {
                if (userRef) {
                  const userSnapshot = await getDoc(userRef);
                  if (userSnapshot.exists()) {
                    const userSnapshotData = userSnapshot.data();
                    userData = {
                      id: userSnapshot.id,
                      uid: userSnapshot.id,
                      displayName: userSnapshotData?.displayName,
                      email: userSnapshotData?.email ?? "",
                    };
                  }
                }

                if (institutionRef) {
                  const institutionSnapshot = await getDoc(institutionRef);
                  if (institutionSnapshot.exists()) {
                    const institutionSnapshotData = institutionSnapshot.data();
                    institutionData = {
                      id: institutionSnapshot.id,
                      name: institutionSnapshotData?.name,
                    };
                  }
                }
              } catch (error) {
                console.error("Error fetching referenced document:", error);
                continue;
              }

              eventsList.push({
                id: doc.id,
                ...docData,
                createdBy: userData,
                institutionOwning: institutionData?.name,
              } as History);
            }

            console.log("Fetched events:", eventsList);

            const todayEvents = eventsList.filter((event) => {
              if (!event.occuringDate) {
                return false;
              }
              const eventDate = new Date(event.occuringDate);
              return (
                eventDate.getMonth() === todayMonth &&
                eventDate.getDate() === todayDate
              );
            });

            const weekEvents = eventsList.filter((event) => {
              if (!event.occuringDate) {
                return false;
              }
              const eventDate = new Date(event.occuringDate);
              return eventDate >= startOfWeek && eventDate <= endOfWeek;
            });

            setTodayEvents(todayEvents);
            setWeekEvents(weekEvents);
            setLoading(false);
          },
          (err) => {
            console.error("Error fetching articles:", err);
            setLoading(false);
          }
        );

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching history events:", error);
        setLoading(false);
      }
    };

    fetchHistoryEvents();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="md:block">
      {user ? <AuthNav /> : <Nav />}
      <div className="size">
        <div className="bg-background">
          <div className="">
            <div className="h-full py-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-3xl font-semibold tracking-tight">
                    What happened today?
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Top events that happened on this day in history of
                    technology.
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="relative">
                <ScrollArea>
                  <div className="flex space-x-4 pb-4">
                    {todayEvents.length > 0 ? (
                      todayEvents.map((album) => (
                        <Sheet key={album?.title}>
                          <SheetTrigger asChild>
                            <AlbumArtwork
                              album={album}
                              className="w-[250px]"
                              aspectRatio="portrait"
                              width={250}
                              height={330}
                            />
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>{album?.title}</SheetTitle>
                              <SheetDescription>{`Uploaded by ${album?.createdBy?.displayName}`}</SheetDescription>
                            </SheetHeader>
                            <div>
                              <div className="overflow-hidden rounded-lg my-5">
                                <Image
                                  src={album.cover}
                                  alt={album?.title}
                                  width={200}
                                  height={330}
                                  className={cn(
                                    "h-auto w-full object-cover transition-all aspect-square"
                                  )}
                                />
                              </div>
                              <div
                                className="py-2 prose !max-w-none dark:prose-invert"
                                dangerouslySetInnerHTML={{
                                  __html: album?.description ?? "",
                                }}
                              ></div>
                              <p className="font-bold text-xs">{`Happened on ${album?.occuringDate}`}</p>
                              <div className="flex items-center justify-between mt-4">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex gap-2"
                                >
                                  <Heart className="h-4 w-4" /> Like
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex gap-2"
                                >
                                  Share <Share2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </SheetContent>
                        </Sheet>
                      ))
                    ) : (
                      <p>No events today!</p>
                    )}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
              <div className="mt-6 space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  What happened this week?
                </h2>
                <p className="text-sm text-muted-foreground">
                  These are events that happened this week in history of
                  technology.
                </p>
              </div>
              <Separator className="my-4" />
              <div className="relative">
                <ScrollArea>
                  <div className="flex space-x-4 pb-4">
                    {weekEvents.length > 0 ? (
                      weekEvents.map((album) => (
                        <Sheet key={album?.title}>
                          <SheetTrigger asChild>
                            <AlbumArtwork
                              key={album?.title}
                              album={album}
                              className="w-[150px]"
                              aspectRatio="square"
                              width={150}
                              height={150}
                            />
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>{album?.title}</SheetTitle>
                              <SheetDescription>{`Uploaded by ${album?.createdBy}`}</SheetDescription>
                            </SheetHeader>
                            <div>
                              <div className="overflow-hidden rounded-lg my-5">
                                <Image
                                  src={album.cover}
                                  alt={album?.title}
                                  width={200}
                                  height={330}
                                  className={cn(
                                    "h-auto w-full object-cover transition-all aspect-square"
                                  )}
                                />
                              </div>
                              <p className="py-2 leading-normal">
                                {album.description}
                              </p>
                              <p className="font-bold text-xs">{`Happened on ${album?.occuringDate}`}</p>
                              <div className="flex items-center justify-between mt-4">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex gap-2"
                                >
                                  <Heart className="h-4 w-4" /> Like
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex gap-2"
                                >
                                  Share <Share2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </SheetContent>
                        </Sheet>
                      ))
                    ) : (
                      <p>No events for this week!</p>
                    )}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
}
