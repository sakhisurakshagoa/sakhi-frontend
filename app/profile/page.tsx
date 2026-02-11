"use client";

import Link from "next/link";
import {
  ExclamationTriangleIcon,
  PhoneIcon,
  MapPinIcon,
  LifebuoyIcon,
  ShieldCheckIcon,
  EyeIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

/* ================= PAGE ================= */

export default function Profile() {
  return (
    <section className="w-full bg-gray-50 py-10 px-6 md:px-10">
      {/* Welcome */}
      <div className="mb-12">
        <h1 className="text-3xl font-semibold text-gray-900">
          Welcome to Your Safety Hub
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Your secure space for reporting, finding support, and accessing
          women-friendly resources.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
        <DashboardCard
          title="Emergency Help"
          description="Immediate assistance when you are in danger."
          href="/emergency"
          gradient="from-red-500 to-pink-500"
          icon={<PhoneIcon className="w-7 h-7 text-white" />}
        />

        <DashboardCard
          title="File Complaint"
          description="Report incidents safely and anonymously."
          href="/anonymous_complaint"
          gradient="from-purple-500 to-purple-700"
          icon={<ExclamationTriangleIcon className="w-7 h-7 text-white" />}
        />

        <DashboardCard
          title="Safe Locations"
          description="Find nearby hospitals, police & shelters."
          href="/locations"
          gradient="from-teal-500 to-emerald-500"
          icon={<MapPinIcon className="w-7 h-7 text-white" />}
        />

        <DashboardCard
          title="Get Support"
          description="Access counselling, legal aid & NGOs."
          href="/support"
          gradient="from-indigo-500 to-purple-600"
          icon={<LifebuoyIcon className="w-7 h-7 text-white" />}
        />
      </div>

      {/* Activity Snapshot */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 mb-14">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          My Activity
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <SnapshotItem label="Complaints Filed" value="0" />
          <SnapshotItem label="Support Requests" value="0" />
          <SnapshotItem label="Saved Locations" value="0" />
        </div>
      </div>

      {/* Safety Tips */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Safety Tips
        </h2>

        <div className="space-y-4">
          <SafetyTip
            text="Share your live location with a trusted person when going out."
            bgColor="bg-purple-50"
            icon={<ShieldCheckIcon className="w-5 h-5 text-purple-700" />}
          />

          <SafetyTip
            text="Trust your instincts — leave immediately if you feel unsafe."
            bgColor="bg-pink-50"
            icon={<EyeIcon className="w-5 h-5 text-pink-700" />}
          />

          <SafetyTip
            text="Keep emergency numbers on speed dial and stay prepared."
            bgColor="bg-teal-50"
            icon={<BookOpenIcon className="w-5 h-5 text-teal-700" />}
          />
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/education"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-700
                       text-white font-semibold hover:from-purple-600 hover:to-purple-800 transition"
          >
            Know More Tips
          </Link>
        </div>
      </div>

      {/* Support Message */}
      <div className="bg-purple-50 border border-purple-200 rounded-3xl p-6">
        <p className="text-purple-800 font-medium">
          You are not alone.
        </p>
        <p className="text-purple-700 text-sm mt-1">
          Help is available whenever you need it — quietly, safely, and respectfully.
        </p>
      </div>
    </section>
  );
}

/* ================= COMPONENTS ================= */

function DashboardCard({
  title,
  description,
  href,
  icon,
  gradient,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  gradient: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white border border-gray-200 rounded-3xl p-6
                 hover:shadow-lg transition flex flex-col items-center text-center"
    >
      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4
                    bg-gradient-to-br ${gradient}`}
      >
        {icon}
      </div>

      <h3 className="font-semibold text-gray-900 mb-1">
        {title}
      </h3>

      <p className="text-sm text-gray-600">
        {description}
      </p>
    </Link>
  );
}

function SnapshotItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-2xl font-semibold text-purple-700">
        {value}
      </p>
      <p className="text-sm text-gray-600">
        {label}
      </p>
    </div>
  );
}

function SafetyTip({
  text,
  bgColor,
  icon,
}: {
  text: string;
  bgColor: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className={`${bgColor} border border-gray-200 rounded-2xl px-6 py-4
                 flex items-center gap-4 hover:shadow-md transition`}
    >
      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white">
        {icon}
      </div>
      <p className="text-sm text-gray-700">{text}</p>
    </div>
  );
}
