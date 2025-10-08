

export function normalizeProduct(apiProduct) {
  return {
    id: Number(apiProduct.id),
    title: apiProduct.title,
    price: Number(apiProduct.price),
    description: apiProduct.description || "",
    category: apiProduct.category || "",
    image: apiProduct.image || "",
  };
}
