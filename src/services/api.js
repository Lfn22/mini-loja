export async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error("Erro ao buscar produtos");
    return await response.json();
  } catch (error) {
    console.error("Erro na API:", error);
    return [];
  }
}
