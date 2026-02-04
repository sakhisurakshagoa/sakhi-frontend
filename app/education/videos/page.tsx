const videos = [
  {
    title: "Legal Rights for Women",
    description: "Understanding laws and protections for women",
    videoId: "MF7reW-hkJE",
  },
  {
    title: "Women Safety & Awareness",
    description: "Key awareness tips for personal safety",
    videoId: "KecF3KASw6w",
  },
  {
    title: "Empowerment & Self Protection",
    description: "Steps to build confidence and safety",
    videoId: "NOLzqMmJ-6I",
  },
];

export default function VideosPage() {
  return (
    <main className="min-h-screen bg-[#f5f3ff] px-4 py-14">
      <h1 className="education-heading">Educational Videos</h1>
      <p className="education-subheading">
        Watch curated videos to stay informed and empowered
      </p>

      <div className="education-grid">
        {videos.map((video, index) => (
          <a
            key={index}
            href={`https://www.youtube.com/watch?v=${video.videoId}`}
            target="_blank"
            className="education-card"
          >
            <img
              src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
              alt={video.title}
              className="education-thumbnail"
            />

            <div className="education-content">
              <span className="education-badge">Video</span>
              <h3 className="education-title">{video.title}</h3>
              <p className="education-desc">{video.description}</p>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
