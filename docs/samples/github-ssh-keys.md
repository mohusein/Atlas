# Connecting to GitHub with SSH

**Company:** GitHub  
**Sample type:** Original summary of public GitHub documentation; not an internal GitHub policy.  
**Source:** [GitHub Docs: About SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh)

## What SSH is used for

SSH provides an authenticated, encrypted connection for Git operations between a local computer and GitHub. Once an SSH key is associated with an account, Git can authenticate over SSH without asking for the account password on every operation.

## Typical setup outline

1. Check whether a suitable SSH key pair already exists on the computer.
2. If needed, generate a supported key pair and add the private key to the local SSH agent.
3. Add the public key to the GitHub account.
4. Use the repository's SSH URL for Git operations and verify that authentication succeeds.

Keep the private key secret. Only the public key should be added to GitHub. Organizations using SAML single sign-on may require an additional authorization step for the key.

## Source note

This summary is for Atlas demonstration and training only. Follow GitHub's current authentication guide for supported algorithms and account-specific steps.
