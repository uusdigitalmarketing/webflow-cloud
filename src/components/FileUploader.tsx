import { useState, useEffect } from "react";

interface FileData {
  name?: string;
  dateUploaded?: string;
  link?: string;
  key?: string;
  uploaded?: string;
  httpMetadata?: {
    contentType?: string;
  };
}

interface FileUploaderProps {
  mountPath?: string;
}

export default function FileUploader({ mountPath = "/" }: FileUploaderProps) {
  const apiBase =
    typeof window !== "undefined" ? window.location.origin + mountPath : mountPath;
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(true);

  const fileIcons: Record<string, string> = {
    pdf: "📄",
    doc: "📝",
    docx: "📝",
    txt: "📄",
    zip: "📦",
    rar: "📦",
    video: "🎥",
    audio: "🎵",
    default: "📎",
  };

  const getFileIcon = (filename: string): string => {
    const ext = filename.split(".").pop()?.toLowerCase();
    if (ext && fileIcons[ext]) return fileIcons[ext];
    if (filename.match(/\.(mp4|avi|mov|wmv|flv|webm|mkv)$/i)) return fileIcons.video;
    if (filename.match(/\.(mp3|wav|flac|aac|ogg|wma)$/i)) return fileIcons.audio;
    return fileIcons.default;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isImage = (filename: string): boolean => {
    return filename.match(/\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i) !== null;
  };

  const deleteFile = async (key: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this file?"
  );

  if (!confirmed) return;

  try {
    const response = await fetch(
      new URL("api/delete-asset", apiBase),
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    setFiles((prev) =>
      prev.filter(
        (file) =>
          (file.key || file.name) !== key
      )
    );

    alert("File deleted successfully");
  } catch (error) {
    console.error(error);
    alert("Failed to delete file");
  }
};

  const loadFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch(new URL("api/list-assets", apiBase));
      if (!response.ok) throw new Error("Failed to load files");

      const fileData = (await response.json()) as FileData[];
      const uniqueFiles = fileData.filter((file, index, self) => {
        const fileKey = file.key || file.name;
        return fileKey && index === self.findIndex((f) => (f.key || f.name) === fileKey);
      });

      setFiles(uniqueFiles);
    } catch (error) {
      console.error("Error loading files:", error);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const uploadFile = async () => {
    const fileInput = document.getElementById("fileUpload") as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (!file) {
      alert("Please select a file first");
      return;
    }

    setIsUploading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(new URL("api/upload", apiBase), {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      setProgress(100);
      alert("File uploaded successfully!");
      loadFiles();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  return (
    <div style={{
      padding: "20px", maxWidth: "800px", margin: "0 auto",
      background: "radial-gradient(circle at top left, rgba(163,201,44,.28), transparent 35%), radial-gradient(circle at bottom right, rgba(93,115,9,.32), transparent 42%), linear-gradient(135deg, #050702 0%, #111907 45%, #1a260a 100%)",
      borderRadius: "24px", position: "relative", overflow: "hidden",
    }}>

      <h2 style={{
        fontSize: "1.8rem", fontWeight: "600", marginBottom: "1.5rem",
        textAlign: "center", color: "rgba(255,255,255,0.92)",
      }}>
        Unidos - [ Upload ]
      </h2>

      {/* Upload Section */}
      <div style={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="file"
            id="fileUpload"
            style={{
              flex: "1", padding: "12px 16px",
              border: "1px solid rgba(163,201,44,0.22)", borderRadius: "8px",
              fontSize: "14px", backgroundColor: "rgba(255,255,255,0.04)",
              cursor: "pointer", transition: "all 0.3s ease", color: "rgba(255,255,255,0.55)",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#a3c92c";
              e.target.style.boxShadow = "0 0 0 3px rgba(163,201,44,0.12)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(163,201,44,0.22)";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        <button
          onClick={uploadFile}
          disabled={isUploading}
          style={{
            padding: "14px 24px",
            background: isUploading ? "rgba(255,255,255,0.08)" : "linear-gradient(135deg, #a3c92c, #7d9812, #5d7309)",
            color: "white", border: "none", borderRadius: "8px",
            cursor: isUploading ? "not-allowed" : "pointer",
            fontSize: "16px", fontWeight: "600", transition: "all 0.3s ease",
            boxShadow: isUploading ? "none" : "0 8px 24px rgba(163,201,44,0.28)",
            opacity: isUploading ? 0.6 : 1,
            transform: isUploading ? "none" : "translateY(0)",
          }}
          onMouseEnter={(e) => {
            if (!isUploading) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 28px rgba(163,201,44,0.35)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isUploading) {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(163,201,44,0.28)";
            }
          }}
        >
          {isUploading ? (
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "16px", height: "16px",
                border: "2px solid transparent", borderTop: "2px solid white",
                borderRadius: "50%", animation: "spin 1s linear infinite",
              }}></div>
              Uploading...
            </span>
          ) : (
            "Upload File"
          )}
        </button>

        {/* Upload Progress */}
        {isUploading && (
          <div style={{ marginTop: "20px" }}>
            <div style={{
              width: "100%", backgroundColor: "rgba(255,255,255,0.08)",
              borderRadius: "8px", overflow: "hidden", height: "12px",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)",
            }}>
              <div style={{
                width: `${progress}%`, height: "100%",
                background: "linear-gradient(90deg, #a3c92c 0%, #7d9812 100%)",
                transition: "width 0.3s ease", borderRadius: "8px",
                boxShadow: "0 0 8px rgba(163,201,44,0.5)",
              }} />
            </div>
            <p style={{
              marginTop: "8px", fontSize: "14px", textAlign: "center",
              color: "rgba(255,255,255,0.5)", fontWeight: "500",
            }}>
              Upload Progress: {Math.round(progress)}%
            </p>
          </div>
        )}
      </div>

      {/* Files Gallery */}
      <div style={{
        border: "1px solid rgba(163,201,44,0.15)", borderRadius: "12px",
        padding: "1.5rem", background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 12px 50px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.08)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h3 style={{ fontSize: "1.3rem", fontWeight: "600", color: "rgba(255,255,255,0.9)", margin: 0 }}>
            Uploaded Files
          </h3>
          <button
            onClick={loadFiles}
            disabled={loading}
            style={{
              padding: "8px 16px",
              border: "1px solid rgba(163,201,44,0.28)",
              background: "transparent", color: "#a3c92c", borderRadius: "6px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "14px", fontWeight: "500", transition: "all 0.3s ease",
            }}
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <div style={{
              width: "24px", height: "24px",
              border: "2px solid transparent", borderTop: "2px solid #a3c92c",
              borderRadius: "50%", animation: "spin 1s linear infinite",
              margin: "0 auto 1rem",
            }}></div>
            <p style={{ color: "rgba(255,255,255,0.5)", margin: 0 }}>Loading files...</p>
          </div>
        ) : files.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📁</div>
            <p style={{ color: "rgba(255,255,255,0.55)", margin: 0 }}>No files uploaded yet</p>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem", margin: "0.5rem 0 0 0" }}>
              Upload some files to get started
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file, index) => {
              const fileName = file.name || file.key || "Unknown file";
              const fileKey = file.key || file.name || `file-${index}`;
              const assetUrl = new URL("api/asset", apiBase);
              if (file.key) assetUrl.searchParams.set("key", file.key);
              const fileLink = file.link || (file.key ? assetUrl.href : "");
              const uploadDate = file.dateUploaded || file.uploaded || new Date().toISOString();
              const isImageFile = isImage(fileName);

              return (
                <div
                  key={fileKey}
                  style={{
                    border: "1px solid rgba(163,201,44,0.15)", borderRadius: "8px",
                    overflow: "hidden", backgroundColor: "rgba(255,255,255,0.03)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
                    e.currentTarget.style.borderColor = "rgba(163,201,44,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "rgba(163,201,44,0.15)";
                  }}
                >
                  <div style={{ padding: "1rem" }}>
                    {isImageFile ? (
                      <img src={fileLink} alt={fileName} style={{
                        width: "100%", height: "120px", objectFit: "cover",
                        borderRadius: "6px", marginBottom: "0.5rem",
                      }} />
                    ) : (
                      <div style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        height: "120px", backgroundColor: "rgba(163,201,44,0.06)",
                        borderRadius: "6px", marginBottom: "0.5rem",
                      }}>
                        <span style={{ fontSize: "2rem" }}>{getFileIcon(fileName)}</span>
                      </div>
                    )}
                    <h4 style={{
                      fontSize: "0.9rem", fontWeight: "600", margin: "0 0 0.25rem 0",
                      color: "rgba(255,255,255,0.88)", overflow: "hidden",
                      textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>
                      {fileName}
                    </h4>
                    <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", margin: "0 0 0.5rem 0" }}>
                      {formatDate(uploadDate)}
                    </p>
                    
                    <div
  style={{
    display: "flex",
    gap: "8px",
    marginTop: "10px",
  }}
>
  <a
    href={fileLink}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "inline-block",
      padding: "6px 12px",
      background:
        "linear-gradient(135deg, rgba(163,201,44,0.22), rgba(93,115,9,0.22))",
      border: "1px solid rgba(163,201,44,0.28)",
      color: "#a3c92c",
      textDecoration: "none",
      borderRadius: "4px",
      fontSize: "0.8rem",
      fontWeight: "500",
    }}
  >
    View
  </a>

  <button
    onClick={() => deleteFile(fileKey)}
    style={{
      padding: "6px 12px",
      background: "#dc2626",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "0.8rem",
    }}
  >
    Delete
  </button>
</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `,
      }} />
    </div>
  );
}