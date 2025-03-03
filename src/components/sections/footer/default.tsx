import { ModeToggle } from "../../ui/mode-toggle";
import {
  Footer,
  FooterColumn,
  FooterBottom,
  FooterContent,
} from "../../ui/footer";
import Link from "next/link";
import Company from "@/components/logos/company";
import { APP } from "@/variables/globals";
import { Separator } from "@/components/ui/separator";

export default function FooterSection() {
  return (
    <footer className="w-full bg-background size">
      <Separator />
      <div className="mx-auto">
        <Footer>
          <FooterContent className="flex justify-between gap-3 flex-wrap">
            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <Company />
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold">Product</h3>
              <Link href="/" className="text-sm text-muted-foreground">
                Changelog
              </Link>
              <Link href="/" className="text-sm text-muted-foreground">
                Documentation
              </Link>
              <Link href="/" className="text-sm text-muted-foreground">
                Benefits for Institutions
              </Link>
              <Link href="/" className="text-sm text-muted-foreground">
                Benefits for Learners
              </Link>
              <Link href="/" className="text-sm text-muted-foreground">
                Request for a Demo
              </Link>
            </FooterColumn>

            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold">Company</h3>
              <Link href="/" className="text-sm text-muted-foreground">
                About
              </Link>
              <Link href="/" className="text-sm text-muted-foreground">
                Careers
              </Link>
              <Link href="/" className="text-sm text-muted-foreground">
                Blog
              </Link>
              <Link href="/" className="text-sm text-muted-foreground">
                Testimonials
              </Link>
              <Link href="/" className="text-sm text-muted-foreground">
                Our People
              </Link>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold">Contact Us</h3>
              <Link href="/" className="text-sm text-muted-foreground">
                LinkedIn
              </Link>
              <Link href="/" className="text-sm text-muted-foreground">
                X (Twitter)
              </Link>
              <Link href="/" className="text-sm text-muted-foreground">
                Instagram
              </Link>
              <Link href="/" className="text-sm text-muted-foreground">
                Facebook
              </Link>
            </FooterColumn>
            <FooterColumn></FooterColumn>
          </FooterContent>
          <FooterBottom>
            <div>
              &copy; {new Date().getFullYear()} {APP?.NAME}. All rights reserved
            </div>
            <div className="flex items-center gap-4">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <ModeToggle />
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
