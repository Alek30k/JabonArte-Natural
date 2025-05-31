export const getImageUrl = (
  imageUrl: string,
  width: number = 400,
  height: number = 400
) => {
  if (!imageUrl) return `/placeholder.svg?height=${height}&width=${width}`;

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    if (imageUrl.includes("res.cloudinary.com")) {
      const parts = imageUrl.split("/upload/");
      return `${parts[0]}/upload/q_auto,f_auto,w_${width},h_${height},c_fill/${parts[1]}`;
    }
    return imageUrl;
  }

  if (imageUrl.startsWith("/uploads/")) {
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`;
  }

  return `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${imageUrl}`;
};

export const getBlurDataUrl = (imageUrl: string) => {
  if (imageUrl?.includes("res.cloudinary.com")) {
    const parts = imageUrl.split("/upload/");
    return `${parts[0]}/upload/q_10,w_20/${parts[1]}`;
  }
  return "/placeholder.svg";
};
