import React from 'react';
import { Navbar } from '../components/Navbar.tsx';
import { Footer } from '../components/Footer.tsx';
import { CricketAtmosphericBackground } from '../components/CricketAtmosphericBackground.tsx';
import { AuctionRoomCreator } from '../components/auction/AuctionRoomCreator.tsx';
import { AuctionLobby } from '../components/auction/AuctionLobby.tsx';
import { useAuctionRoom } from '../hooks/useAuctionRoom.ts';
import type { AppView } from '../App.tsx';

interface AuctionPageProps {
  onNavigateView: (
    view: AppView,
    playerId?: string,
    cardId?: string,
    momentId?: string,
    stadiumId?: string
  ) => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  onPlayTone: () => void;
}

export const AuctionPage: React.FC<AuctionPageProps> = ({
  onNavigateView,
  isPlayingAudio,
  onToggleAudio,
}) => {
  const {
    roomState,
    createRoom,
    joinRoom,
    addPlayerToPool,
    removePlayerFromPool,
    addMultiplePlayersToPool,
    clearPlayerPool,
    addSimulatedParticipant,
    removeParticipant,
    updateParticipantTeam,
    leaveRoom,
  } = useAuctionRoom();

  return (
    <div className="min-h-screen bg-[#060709] text-white flex flex-col relative selection:bg-amber-400 selection:text-black">
      {/* Dynamic Stadium Ambience Background */}
      <CricketAtmosphericBackground />

      {/* Navigation Bar */}
      <Navbar
        currentView="auction"
        onNavigateView={onNavigateView}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={onToggleAudio}
      />

      {/* Main Container */}
      <main className="flex-1 pt-24 pb-16 relative z-10">
        {!roomState ? (
          <AuctionRoomCreator
            onCreateRoom={(hostName, maxParticipants, teamCode) => {
              createRoom(hostName, maxParticipants, teamCode);
            }}
            onJoinRoom={(roomCode, participantName, teamCode) => {
              return joinRoom(roomCode, participantName, teamCode);
            }}
          />
        ) : (
          <AuctionLobby
            roomState={roomState}
            onAddPlayer={addPlayerToPool}
            onRemovePlayer={removePlayerFromPool}
            onAddMultiplePlayers={addMultiplePlayersToPool}
            onClearPool={clearPlayerPool}
            onAddSimulatedParticipant={addSimulatedParticipant}
            onRemoveParticipant={removeParticipant}
            onUpdateTeam={updateParticipantTeam}
            onLeaveRoom={leaveRoom}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigateView={onNavigateView} />
    </div>
  );
};
