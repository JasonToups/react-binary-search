export function useScrollUtils() {
  const scrollToTreeHeading = () => {
    const treeSection = document.querySelector('.binary-tree-container');
    if (treeSection) {
      treeSection.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return {
    scrollToTreeHeading,
    scrollToTop,
  };
}
