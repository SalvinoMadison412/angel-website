import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Privacy Policy | Angel",
};

const permissions: [string, string][] = [
  [
    "Location — precise (fine/coarse)",
    "Attach your GPS coordinates to a crash alert so guardians know exactly where you are",
  ],
  [
    "Location — background",
    "Keep a live location fix available even when your phone is locked or the screen is off, so a crash that happens mid-ride still produces an accurate location in the alert. Angel does not store or use this background location for any other purpose.",
  ],
  [
    "Bluetooth (scan/connect)",
    "Discover, pair with, and receive crash-event readings from your Angel sensor device over Bluetooth Low Energy",
  ],
  [
    "Foreground service / foreground service location",
    "Run the crash-monitoring service as a persistent foreground process so the OS does not suspend it while you ride — required for background location to function reliably",
  ],
  [
    "Notifications",
    "Alert you on your own phone if a crash is detected while the app is backgrounded, and show the cancel-countdown notification — separate from the WhatsApp message and call sent to your guardians",
  ],
  ["Vibrate", "Haptic feedback during the crash-alert countdown and when a guardian confirms receipt"],
  [
    "Photo library (read-only)",
    "Let you pick an existing photo for your profile picture — Angel never requests camera access",
  ],
];

export default function PrivacyPage() {
  return (
    <section className="border-b border-divider pt-[72px]">
      <Container className="max-w-3xl py-14 sm:py-20 lg:py-24">
        <SectionLabel index="LEGAL">Privacy Policy</SectionLabel>
        <h1 className="mt-5 font-heading text-4xl font-bold text-white">Privacy Policy</h1>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-widest2 text-ink-dim">
          Last updated: August 17, 2026
        </p>

        <div className="mt-12 space-y-8 font-body text-sm leading-relaxed text-ink-muted sm:text-base">
          <p>
            Angel ("Angel", "we", "us") provides a two-wheeler crash-detection app that pairs with Atom, a
            vehicle-mounted crash sensor, detects possible crashes, and alerts your emergency contacts. This
            policy explains what data Angel collects, why, and how it's handled.
          </p>

          <div>
            <h2 className="mb-4 font-heading text-xl font-bold text-white">Data we collect</h2>
            <div className="space-y-4">
              <p>
                <strong className="text-white">Account information.</strong> Your phone number (used to sign in
                via SMS one-time passcode) or, if you choose Google Sign-In, the name and email address Google
                provides.
              </p>
              <p>
                <strong className="text-white">Profile photo (optional).</strong> If you choose to add one, a
                profile picture you pick from your photo gallery. Angel never requests camera access for this —
                only your existing photo library. Stored in our cloud storage provider (Supabase Storage) and
                displayed back to you in the app; not shared with guardians or any other party.
              </p>
              <p>
                <strong className="text-white">Location.</strong> Angel continuously monitors your precise GPS
                location in the background while the app is running — including when your phone is locked or the
                screen is off — so that an accurate location fix is available immediately if a crash is detected
                at any time. This background location is not stored or logged continuously; it is captured and
                transmitted to your guardians only at the moment a crash alert is confirmed and not cancelled. We
                do not use your location for advertising or share it with any party other than your guardians and
                Twilio (solely to generate the alert message).
              </p>
              <p>
                <strong className="text-white">Bluetooth / sensor data.</strong> Angel pairs with your Angel
                crash-sensor device over Bluetooth Low Energy. Impact force, rotation, tilt, and "stillness"
                readings from the sensor are used to detect and classify possible crashes, and to support
                cancelling a false alarm. A copy of these raw readings is also kept in a log stored locally on
                your device (not uploaded anywhere) so crash-detection accuracy can be reviewed and improved over
                time; this local log is not currently deleted automatically.
              </p>
              <p>
                <strong className="text-white">Emergency contacts ("guardians").</strong> Names and phone numbers
                you add are stored so Angel can reach them the moment a crash alert isn't cancelled in time — by
                WhatsApp message and by an automated phone call, both sent automatically with no separate opt-in
                step required from the guardian.
              </p>
              <p>
                <strong className="text-white">Emergency medical profile (optional).</strong> If you choose to
                provide it, your blood group and any medical conditions are stored for your own reference in the
                app. This information is not currently shared with anyone else — including guardians, or a
                trained responder — as part of any automated alert; it exists to support a future
                responder-dispatch feature, not the current release.
              </p>
              <p>
                <strong className="text-white">Crash and incident records.</strong> When a crash alert is
                triggered, we record the event — including the raw sensor readings above, not just the computed
                severity — so it can be tracked and reviewed by you afterward in your incident history. This is
                retained for as long as your account is active, the same as the rest of your account data (see
                "Data retention & deletion").
              </p>
              <p>
                <strong className="text-white">Device/bike info.</strong> Optional make/model you enter for your
                paired device, and sensor calibration offsets.
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-heading text-xl font-bold text-white">How we use this data</h2>
            <p>Angel uses the data above solely to:</p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>Detect a possible crash and let you cancel a false alarm</li>
              <li>
                Alert your guardians by WhatsApp message and automated phone call when a crash alert is confirmed
                or a check-in is missed
              </li>
              <li>Maintain your account, profile, and incident history</li>
              <li>Diagnose and improve crash-detection accuracy</li>
            </ul>
            <p className="mt-4">
              We do not sell your data. We do not use your location, sensor, or medical data for advertising.
            </p>
          </div>

          <div>
            <h2 className="mb-4 font-heading text-xl font-bold text-white">Third parties</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>Supabase hosts our database, authentication, file storage, and backend functions.</li>
              <li>
                Twilio delivers the WhatsApp message and places the automated phone call to your guardians. Only
                the guardian's name and phone number, and the alert message/call script (which includes a Google
                Maps link to your last known location) are sent to Twilio — never your medical profile, never
                another guardian's details.
              </li>
              <li>Google provides optional Sign-In and, where used, map display.</li>
            </ul>
            <p className="mt-4">
              Each of these processes data only as needed to provide the functionality above, under their own
              security and privacy commitments.
            </p>
          </div>

          <div>
            <h2 className="mb-4 font-heading text-xl font-bold text-white">Data retention & deletion</h2>
            <p>
              Your account data, guardians, medical profile, incident history (including raw sensor readings),
              and profile photo are retained while your account is active. You can delete your account and
              associated data at any time by contacting us (see below); emergency medical information and
              guardian contact details are removed immediately on request. The on-device sensor-event log
              described above lives only on your phone and is cleared if you uninstall the app.
            </p>
          </div>

          <div>
            <h2 className="mb-4 font-heading text-xl font-bold text-white">
              Permissions this app requests, and why
            </h2>
            <div className="grid grid-cols-1 border border-glass">
              {permissions.map(([label, reason], i) => (
                <div
                  key={label}
                  className={`grid grid-cols-1 gap-2 p-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] sm:gap-6 ${
                    i < permissions.length - 1 ? "border-b border-divider" : ""
                  }`}
                >
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-ink-dim">{label}</span>
                  <span className="text-sm text-ink-muted sm:text-base">{reason}</span>
                </div>
              ))}
            </div>
            <p className="mt-4">
              Angel does not request permissions beyond what's listed above, and does not access your contacts or
              other apps' data.
            </p>
          </div>

          <div>
            <h2 className="mb-4 font-heading text-xl font-bold text-white">Children's privacy</h2>
            <p>Angel is not directed at children under 13, and we do not knowingly collect data from them.</p>
          </div>

          <div>
            <h2 className="mb-4 font-heading text-xl font-bold text-white">Changes to this policy</h2>
            <p>
              We'll update the "Last updated" date above when this policy changes. Material changes will be
              communicated to the email or phone number on your account where possible.
            </p>
          </div>

          <div>
            <h2 className="mb-4 font-heading text-xl font-bold text-white">Contact us</h2>
            <p>
              Questions about this policy or a request to access/delete your data:{" "}
              <a href="mailto:hello@angelcrash.in" className="text-accent underline underline-offset-4">
                hello@angelcrash.in
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
