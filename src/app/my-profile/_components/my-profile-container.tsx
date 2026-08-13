import ProfileSidebar from "./profile-sidebar";

const inputClassName =
  "h-11 w-full rounded border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-[#2674b7] focus:ring-2 focus:ring-[#2674b7]/15";

const MyProfileContainer = () => {
  return (
    <main className="min-h-screen border-t border-slate-100 bg-white">
      <section className="container px-4 pb-12 pt-8 sm:pt-10 lg:pb-20">
        <header className="text-center">
          <h1 className="text-3xl font-semibold tracking-[-0.035em] text-[#171717] sm:text-4xl">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">Manage your Profile</p>
        </header>

        <div className="mt-10 grid items-start gap-5 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:mt-12 sm:p-4 lg:grid-cols-[280px_minmax(0,1fr)]">
          <ProfileSidebar />

          <div className="min-h-[500px] rounded-lg border border-slate-200 bg-[#f8f9fa] p-5 sm:p-8 lg:p-10">
            <h2 className="text-2xl font-semibold text-slate-800">Edit Profile</h2>
            <p className="mt-1 text-sm text-slate-500">
              Manage your personal information and profile details.
            </p>

            <form className="mt-8 space-y-5">
              <div>
                <label htmlFor="profile-name" className="mb-2 block text-sm font-medium text-slate-900">Name</label>
                <input id="profile-name" name="name" type="text" defaultValue="Madina Lata" autoComplete="name" className={inputClassName} />
              </div>
              <div>
                <label htmlFor="profile-email" className="mb-2 block text-sm font-medium text-slate-900">Email Address</label>
                <input id="profile-email" name="email" type="email" autoComplete="email" className={inputClassName} />
              </div>
              <div>
                <label htmlFor="profile-phone" className="mb-2 block text-sm font-medium text-slate-900">Phone Number</label>
                <input id="profile-phone" name="phone" type="tel" defaultValue="+123456" autoComplete="tel" className={inputClassName} />
              </div>
              <div className="flex flex-col justify-end gap-3 pt-3 sm:flex-row">
                <button type="reset" className="h-10 rounded-full border border-[#2674b7] px-5 text-sm font-medium text-[#2674b7] transition hover:bg-[#eef7fd]">Cancel</button>
                <button type="submit" className="h-10 rounded-full bg-[#2a73b5] px-6 text-sm font-medium text-white transition hover:bg-[#205f96]">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MyProfileContainer;
