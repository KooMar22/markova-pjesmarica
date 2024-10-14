import { useState } from "react";
import Header from "./components/Header";
import MediaCard from "./components/MediaCard";
import SongsList from "./components/SongsList";
import Footer from "./components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  // State for tracking the current music index
  const [musicNumber, setMusicNumber] = useState(0); 
  // State for managing SongsList visibility
  const [open, setOpen] = useState(true); 
  // State to store songs from SongsList
  const [songs, setSongs] = useState([]); 

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <Header />
        <main>
          <MediaCard 
            musicNumber={musicNumber} 
            setMusicNumber={setMusicNumber} 
            setOpen={setOpen} 
            songs={songs}
            open={open}
          />
          <SongsList 
            open={open} 
            musicNumber={musicNumber} 
            setMusicNumber={setMusicNumber} 
            setSongs={setSongs} 
          />
        </main>
        <Footer />
      </div>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default App;