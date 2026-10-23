<script setup lang="ts">
import { withBase } from 'vitepress'
import WorkflowSteps from './WorkflowSteps.vue'
import ReleaseList from './ReleaseList.vue'
import { project } from '../../project'

const faqs = [
  {
    q: 'Is RunContainer like LiveContainer, but for Windows?',
    a: 'The idea is similar. LiveContainer lets iOS apps run inside its own managed space instead of being installed on the device directly. RunContainer applies the same idea to Windows: applications are installed and run inside environments that RunContainer manages, rather than as ordinary standalone desktop applications.'
  },
  {
    q: 'Does RunContainer make untrusted software safe to run?',
    a: 'No. Isolation is intended to reduce the impact an application has on the rest of your system, but it is not a guarantee. Treat unknown software with the same caution you would anywhere else.'
  },
  {
    q: 'Will every Windows application work?',
    a: 'No. Some applications expect to be installed system-wide, rely on drivers or services, or use protection that does not work in a managed environment. Compatibility varies from application to application.'
  },
  {
    q: 'Where can I download it?',
    a: `Yes, it is available now. RunContainer ${project.latestDownload.version} is the current Stable release for Windows. The Downloads page points at the installer attached to that Stable GitHub release; both are the same file, and the page lists its SHA-256 checksum so you can verify the download. The installer is not code-signed, so Windows may warn before it runs.`
  }
]
</script>

<template>
  <div class="rc-home">
    <!-- Overview -->
    <section class="rc-section" aria-labelledby="overview">
      <p class="rc-eyebrow">Overview</p>
      <h2 id="overview">A managed home for your Windows applications</h2>
      <p class="rc-lede">
        Normally, installing a Windows application spreads its files, settings and shortcuts across
        your PC. RunContainer is designed to give applications a managed environment of their own,
        so they are easier to keep track of, keep apart and clean up.
      </p>
      <div class="rc-compare">
        <div class="rc-compare-card">
          <h3>Ordinary installation</h3>
          <ul>
            <li>The application is installed directly onto your system.</li>
            <li>Its files and settings mix with everything else on the PC.</li>
            <li>Removing it relies on the application’s own uninstaller.</li>
          </ul>
        </div>
        <div class="rc-compare-card rc-compare-card--accent">
          <h3>With RunContainer</h3>
          <ul>
            <li>The application is installed inside an environment RunContainer manages.</li>
            <li>Environments are designed to be kept separate from your everyday desktop and from other environments.</li>
            <li>You manage, run and clean up applications from one place.</li>
          </ul>
        </div>
      </div>
      <p class="rc-more"><a :href="withBase('/guide/how-it-differs')">How RunContainer differs from ordinary installation →</a></p>
    </section>

    <!-- Video tour -->
    <VideoIntro eyebrow="Watch first" heading="See RunContainer in action" compact />

    <!-- Workflow -->
    <section class="rc-section" aria-labelledby="workflow">
      <p class="rc-eyebrow">How it works</p>
      <h2 id="workflow">Four steps, from install to clean-up</h2>
      <p class="rc-lede">The workflow is the same whatever the application.</p>
      <WorkflowSteps />
    </section>

    <!-- Getting started + requirements -->
    <section class="rc-section rc-split" aria-labelledby="start">
      <div>
        <p class="rc-eyebrow">Getting started</p>
        <h2 id="start">New to RunContainer?</h2>
        <p class="rc-lede">The documentation takes you from the core ideas to a first walkthrough.</p>
        <ol class="rc-start-list">
          <li><a :href="withBase('/guide/introduction')">Read what RunContainer is</a> and the <a :href="withBase('/guide/concepts')">key terms</a>.</li>
          <li>Check the <a :href="withBase('/getting-started/prerequisites')">prerequisites</a> and the <a :href="withBase('/downloads')">Downloads page</a>.</li>
          <li>Follow the <a :href="withBase('/getting-started/walkthrough')">beginner walkthrough</a>.</li>
        </ol>
      </div>
      <aside class="rc-panel" aria-labelledby="requirements">
        <h3 id="requirements">System requirements</h3>
        <dl>
          <div><dt>Operating system</dt><dd>Windows 10 or Windows 11</dd></div>
          <div><dt>Architecture</dt><dd>64-bit (x64)</dd></div>
          <div><dt>Hardware</dt><dd>64-bit PC; virtual-machine environments also need virtualization support</dd></div>
        </dl>
        <p><a :href="withBase('/getting-started/prerequisites')">Full prerequisites and known limitations →</a></p>
      </aside>
    </section>

    <!-- Responsible use -->
    <section class="rc-section" aria-labelledby="safety">
      <p class="rc-eyebrow">Responsible use</p>
      <h2 id="safety">Isolation helps. It is not a guarantee.</h2>
      <div class="rc-grid-3">
        <div class="rc-card">
          <h3>Reduces impact</h3>
          <p>Environments are intended to limit how much an application affects the rest of your PC.</p>
        </div>
        <div class="rc-card">
          <h3>Not malware protection</h3>
          <p>RunContainer is not an antivirus or a security sandbox for hostile software. Keep your normal protections on.</p>
        </div>
        <div class="rc-card">
          <h3>Mind your credentials</h3>
          <p>Applications inside an environment can still see what you type into them. Sign in only where you trust the software.</p>
        </div>
      </div>
      <p class="rc-more"><a :href="withBase('/safety/isolation')">Read the safety and privacy guide →</a></p>
    </section>

    <!-- FAQ -->
    <section class="rc-section" aria-labelledby="faq">
      <p class="rc-eyebrow">FAQ</p>
      <h2 id="faq">Common questions</h2>
      <div class="rc-faq">
        <details v-for="item in faqs" :key="item.q">
          <summary>{{ item.q }}</summary>
          <p>{{ item.a }}</p>
        </details>
      </div>
      <p class="rc-more"><a :href="withBase('/reference/faq')">All frequently asked questions →</a></p>
    </section>

    <!-- Changelog + contribute -->
    <section class="rc-section rc-split" aria-labelledby="changes">
      <div>
        <p class="rc-eyebrow">Changelog</p>
        <h2 id="changes">Release highlights</h2>
        <ReleaseList :limit="3" />
        <p class="rc-more"><a :href="withBase('/changelog')">Full changelog →</a></p>
      </div>
      <div>
        <p class="rc-eyebrow">Contribute</p>
        <h2 id="contribute">Help shape RunContainer</h2>
        <p>
          Bug reports, compatibility notes and documentation fixes are all valuable. Read the
          contribution guide to see how to take part.
        </p>
        <p v-if="!project.repoUrl" class="rc-note">
          The public source repository and issue tracker have not been published yet.
        </p>
        <div class="rc-actions">
          <a class="rc-btn" :href="withBase('/reference/contributing')">Contribution guide</a>
          <a class="rc-btn rc-btn--ghost" :href="withBase('/community')">Community &amp; links</a>
        </div>
      </div>
    </section>
  </div>
</template>
