import { useEffect } from "react";
import "../styles/footer-item.scss";

const ListeningTo = () => {
  useEffect(() => {
    const fetchMusic = async () => {
      const isCached = localStorage.getItem("listeningToCached");
      const cachedTime = localStorage.getItem("listeningToCachedTimestamp");

      if (isCached && cachedTime) {
        const currTime = new Date().getTime();
        const fiveMinutes = 5 * 60 * 1000;

        if (currTime - parseInt(cachedTime) < fiveMinutes) {
          const title = localStorage.getItem("listeningToTitle")!;
          const link = localStorage.getItem("listeningToLink")!;
          const listening = localStorage.getItem("listeningToListening")!;

          document.getElementById("track-title")!.innerHTML = title;
          document.getElementById("track-link")!.setAttribute("href", link);
          document.getElementById("track-listening")!.innerHTML = listening;

          return;
        }
      }

      const response = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=tem_t&api_key=82ffa9b5246e4b2afe2746ab9abda62f&format=json&limit=1`
      );
      const data = await response.json();
      const track = data.recenttracks.track[0];
      const { name: title, url: link } = track;

      let listening;
      if (track["@attr"] !== undefined) {
        listening = "Now Listening";
      } else {
        const timestamp = parseInt(track.date.uts);
        const date = new Date(timestamp * 1000);
        const dateFormat =
          date.getHours() +
          ":" +
          (date.getMinutes() < 10
            ? "0" + date.getMinutes()
            : date.getMinutes()) +
          ", " +
          date.toDateString();
        listening = dateFormat;
      }

      localStorage.setItem("listeningToTitle", title);
      localStorage.setItem("listeningToLink", link);
      localStorage.setItem("listeningToListening", listening);
      localStorage.setItem(
        "listeningToCachedTimestamp",
        new Date().getTime().toString()
      );
      localStorage.setItem("listeningToCached", "true");

      document.getElementById("track-title")!.innerHTML = title;
      document.getElementById("track-link")!.setAttribute("href", link);
      document.getElementById("track-listening")!.innerHTML = listening;
    };

    fetchMusic();
  }, []);

  return (
    <div className="text-container">
      <span className="text">
        <span>🎵</span>
        <a
          id="track-link"
          href="https://open.spotify.com/user/tem_t"
          target="_blank"
          className="details"
        >
          <span id="track-title" />
          <span id="track-listening" />
        </a>
      </span>
    </div>
  );
};

export default ListeningTo;
