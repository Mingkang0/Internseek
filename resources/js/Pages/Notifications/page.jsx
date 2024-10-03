import DefaultLayout from "@/layout/defaultLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Notifications({ notifications }) {
  // Group notifications by the 'created_at' date using native JS
  const groupedNotifications = notifications.reduce((acc, notification) => {
    const date = new Date(notification.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }); // Format the date as "Month Day, Year"

    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(notification);
    return acc;
  }, {});

  const { auth } = usePage().props;
  return (
    <DefaultLayout>
      <Head title="Notifications" />
      <div className="bg-gray-200 px-6 py-4 min-h-screen mx-auto overflow-y-auto lg:py-4">
        <div className="mx-auto w-full lg:max-w-2xl">
          <div className="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50">

            <h5 className="text-center mb-2 text-lg font-bold tracking-tight text-gray-900">
              Notifications
            </h5>
            <div className="flex justify-between items-center">
              {
                auth.user.company ? (
                  <>
                    <Link method='post' href="/employer/notifications/markAsRead" className="text-blue-600 text-sm mb-2">Mark all as Read</Link>
                    <Link
                      href="/employer/delete-all-notifications"
                      method="post"
                      className="content-end text-blue-600 text-sm mb-2"
                    >
                      Clear All
                    </Link>
                  </>)
                  : (
                    <>
                      <Link method='post' href="/student/notifications/markAsRead" className="text-blue-600 text-sm mb-2">Mark all as Read</Link>
                      <Link
                        href="/student/delete-all-notifications"
                        method="post"
                        className="content-end text-blue-600 text-sm mb-2"
                      >
                        Clear All
                      </Link>
                    </>
                  )}

            </div>
            <hr className="my-2 border-gray-300" />
            {Object.keys(groupedNotifications).map((date) => (
              <div key={date} className="mb-6">
                {/* Date header */}
                <h6 className="text-md font-semibold text-gray-700 mb-2">
                  {date} {/* Display the date in "Month Day, Year" format */}
                </h6>

                <ol className="divide-y divider-gray-300">
                  {groupedNotifications[date].map((notification, index) => (
                    <li
                      key={notification.id}
                      className="my-1 w-full p-3 text-sm text-left rounded-md"
                    >
                      <div className="flex justify-between items-center">
                        <p>
                          {index + 1}. {JSON.parse(notification.data).message}
                        </p>
                        {/* Red dot for unread notifications */}
                        {notification.read_at === null && (
                          <span className="ml-2 w-3 h-3 rounded-full bg-red-600 inline-block"></span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 text-right">
                        {new Date(notification.created_at).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          }
                        )}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
