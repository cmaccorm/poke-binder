import { getBinder, getBinderPage } from "@/lib/binders";
import { notFound } from "next/navigation";
import BinderViewer from "@/components/BinderViewer";

interface BinderPageProps {
  params: Promise<{ binderId: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function BinderPage({ params, searchParams }: BinderPageProps) {
  const { binderId } = await params;
  const { page: pageStr } = await searchParams;
  const binder = await getBinder(binderId);

  if (!binder) {
    notFound();
  }

  const requestedPage = pageStr ? parseInt(pageStr, 10) : binder.lastViewedPage;
  const initialPage = isNaN(requestedPage) ? 0 : requestedPage;

  // Fetch initial page data server-side to eliminate client waterfall
  let initialPageData = await getBinderPage(binderId, initialPage);

  // Fallback to page 0 if the requested page doesn't exist
  if (!initialPageData && initialPage !== 0) {
    initialPageData = await getBinderPage(binderId, 0);
  }

  return (
    <BinderViewer
      binder={binder}
      initialPage={initialPageData ? initialPageData.pageIndex : 0}
      initialPageData={initialPageData}
    />
  );
}
