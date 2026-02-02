"use client";

import { useTheme } from "@/lib/theme-context";
import Link from "next/link";
import Footer from "@/components/footer";

export default function BuildSystemsPost() {
    const { isDark } = useTheme();

    const textPrimary = isDark ? "text-white" : "text-[#0a0a0a]";
    const textSecondary = isDark ? "text-white/60" : "text-[#0a0a0a]/60";
    const textMuted = isDark ? "text-white/40" : "text-[#0a0a0a]/40";
    const border = isDark ? "border-white/10" : "border-[#0a0a0a]/10";

    return (
        <main className="min-h-screen px-6 py-12 md:px-12 lg:px-24 max-w-3xl mx-auto">
            <div className="mb-12">
                <Link href="/writing" className={`text-sm ${textMuted} hover:${textSecondary} underline underline-offset-2`}>
                    ← Back to writing
                </Link>
                <h1 className={`text-2xl md:text-3xl font-medium ${textPrimary} mt-6 mb-3`}>
                    I Finally Understood C++ Build Systems (After Being Confused for Way Too Long)
                </h1>
                <div className={`text-sm ${textMuted}`}>
                    <span>January 2026</span>
                    <span className="mx-2">•</span>
                    <span>12 min read</span>
                </div>
            </div>

            {/* Content */}
            <article className={`prose prose-invert max-w-none ${textSecondary} leading-relaxed space-y-6`}>
                <p>
                    For a long time, I avoided C++ build systems, or at least tried to keep my interaction with them to a minimum.
                </p>

                <p>
                    Things worked sometimes, and when they didn't, the errors felt completely disconnected from what I had actually written. I knew how to write C++, but the moment build tools were involved (CMake, Ninja, MSBuild),  I felt lost in the technical jargon.
                </p>

                <p>
                    Turns out, I was.
                </p>

                <h2 className={`text-xl font-medium ${textPrimary} mt-8`}>
                    The Mistake I Was Making
                </h2>

                <p>
                    I used to think the compiler was the build system.
                </p>

                <p>
                    If I ran <code className={`${isDark ? 'bg-white/5' : 'bg-black/5'} px-2 py-1 rounded`}>cl</code> or <code className={`${isDark ? 'bg-white/5' : 'bg-black/5'} px-2 py-1 rounded`}>g++</code> and got an executable, that was the end of the story. Everything else just felt like extra ceremony. But once projects got bigger—or I moved between Windows and Linux—that mental model completely fell apart.
                </p>

                <p>
                    The real issue was that I hadn't separated the layers in my head.
                </p>

                <h2 className={`text-xl font-medium ${textPrimary} mt-8`}>
                    The Mental Model That Changed Everything
                </h2>

                <p>
                    What finally clicked for me was realizing that a modern C++ build usually has three distinct layers:
                </p>

                <ul className="space-y-2 ml-4">
                    <li>• Something that describes how to build the project</li>
                    <li>• Something that executes the build</li>
                    <li>• Something that actually compiles and links the code</li>
                </ul>

                <p>
                    Once I stopped lumping everything together, the ecosystem stopped feeling random.
                </p>

                <h2 className={`text-xl font-medium ${textPrimary} mt-8`}>
                    CMake Isn't a Build System (and That Surprised Me)
                </h2>

                <p>
                    For a while, I thought CMake was the build system.
                </p>

                <p>
                    It's not.
                </p>

                <p>
                    CMake is a build generator. It doesn't compile anything. It just writes instructions for other tools.
                </p>

                <p>
                    That's why the same CMake project can turn into:
                </p>

                <ul className="space-y-2 ml-4">
                    <li>• Visual Studio solutions</li>
                    <li>• Ninja build files</li>
                    <li>• Makefiles</li>
                </ul>

                <p>
                    That realization alone explained a huge amount of confusion I'd had about why CMake "worked differently" depending on the generator.
                </p>

                <h2 className={`text-xl font-medium ${textPrimary} mt-8`}>
                    Build Systems: The Middle Layer I Ignored
                </h2>

                <p>
                    The next piece was understanding what tools like MSBuild, Ninja, and Make actually do.
                </p>

                <ul className="space-y-2 ml-4">
                    <li>• They don't know C++.</li>
                    <li>• They don't know headers.</li>
                    <li>• They don't even really know what a compiler is.</li>
                </ul>

                <p>
                    They just run commands.
                </p>

                <p>
                    Ninja especially made this obvious to me. It doesn't care if it's running MSVC, Clang, or GCC—it just executes whatever commands CMake gave it. That's why it feels so fast and simple.
                </p>

                <p>
                    MSBuild, on the other hand, is tightly integrated with Visual Studio. It works great for large Windows projects, but it also explains why .sln and .vcxproj files feel so "Visual Studio–specific".
                </p>

                <h2 className={`text-xl font-medium ${textPrimary} mt-8`}>
                    MSVC Felt Easy… Until I Left Visual Studio
                </h2>

                <p>
                    MSVC was my first serious Windows toolchain, and honestly, it felt very smooth inside Visual Studio.
                </p>

                <p>
                    Everything was bundled:
                </p>

                <ul className="space-y-2 ml-4">
                    <li>• Compiler</li>
                    <li>• Standard library</li>
                    <li>• Linker</li>
                    <li>• Windows SDK</li>
                    <li>• Debugger</li>
                </ul>

                <p>
                    But the moment I tried using it from the command line, I hit the Developer Command Prompt requirement. That was my first hint that there was more going on behind the scenes than just "run the compiler".
                </p>

                <p>
                    Visual Studio was doing a lot of environment setup for me.
                </p>

                <h2 className={`text-xl font-medium ${textPrimary} mt-8`}>
                    Clang Taught Me What a Toolchain Really Is
                </h2>

                <p>
                    Clang (LLVM) was where things finally clicked at a deeper level.
                </p>

                <p>
                    I learned that Clang by itself isn't a full toolchain. It doesn't ship with:
                </p>

                <ul className="space-y-2 ml-4">
                    <li>• a standard library</li>
                    <li>• system headers</li>
                    <li>• a linker</li>
                </ul>

                <p>
                    It relies on whatever the platform provides.
                </p>

                <p>
                    That explained why Clang feels "cleaner" but also harder to set up, especially on Windows. It also made me appreciate why MSVC feels so plug-and-play by comparison.
                </p>

                <h2 className={`text-xl font-medium ${textPrimary} mt-8`}>
                    Why CMake + Ninja Became My Default
                </h2>

                <p>
                    Once I understood the layers, CMake + Ninja made perfect sense.
                </p>

                <p>
                    It let me:
                </p>

                <ul className="space-y-2 ml-4">
                    <li>• Avoid MSBuild when I didn't need it</li>
                    <li>• Switch compilers without rewriting build logic</li>
                    <li>• Use Visual Studio as an IDE, not a build system</li>
                </ul>

                <p>
                    That flexibility felt empowering. Builds stopped feeling like magic and started feeling like infrastructure I could reason about.
                </p>
            </article>

            {/* Footer */}
            <Footer />
        </main>
    );
}
