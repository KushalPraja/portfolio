import React from 'react';
import { GeistMono } from 'geist/font/mono';
import { FiExternalLink, FiGithub, FiPlay } from 'react-icons/fi';

interface VideoProjectCardProps {
  title: string;
  description: string;
  videoId: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  thumbnailQuality?: 'default' | 'hqdefault' | 'mqdefault' | 'sddefault' | 'maxresdefault';
}

const VideoProjectCard: React.FC<VideoProjectCardProps> = ({
  title,
  description,
  videoId,
  tags,
  githubUrl,
  liveUrl,
  thumbnailQuality = 'maxresdefault'
}) => {
  // Get YouTube thumbnail URL
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${thumbnailQuality}.jpg`;
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  
  return (
    <div className="video-project-card">
      {/* Static thumbnail instead of iframe */}
      <div className="absolute inset-0 bg-cover bg-center w-full h-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-center bg-cover transform transition-transform duration-700 hover:scale-110"
          style={{ backgroundImage: `url(${thumbnailUrl})` }}
        ></div>
      </div>
      
      <div className="video-project-overlay"></div>
      
      <div className="video-project-content">
        <h3 className="video-project-title">{title}</h3>
        <p className="video-project-desc">{description}</p>
        
        <div className="video-project-tech">
          {tags.map((tag, index) => (
            <span key={index} className="video-project-tag">{tag}</span>
          ))}
        </div>
        
        <div className="flex gap-4">
          <a 
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="video-project-button"
          >
            <FiPlay size={14} className="mr-2" />
            <span className={GeistMono.className}>Watch Demo</span>
          </a>
          
          <a 
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="video-project-button"
          >
            <FiGithub size={14} className="mr-2" />
            <span className={GeistMono.className}>GitHub</span>
          </a>
          
          {liveUrl && (
            <a 
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="video-project-button"
            >
              <FiExternalLink size={14} className="mr-2" />
              <span className={GeistMono.className}>Live Demo</span>
            </a>
          )}
        </div>
      </div>

      {/* Play Button Overlay */}
      <a 
        href={youtubeUrl}
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute inset-0 z-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
        aria-label="Play video"
      >
        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center border border-white/40 hover:bg-white/40 transition-all transform hover:scale-110">
          <FiPlay size={36} className="ml-2" />
        </div>
      </a>
    </div>
  );
};

export default VideoProjectCard;